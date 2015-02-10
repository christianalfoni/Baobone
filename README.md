# Baobone
Flux framework inspired by Backbone, using Baobab

## Concept
Backbone was, and still is, a great framework. It is based on the traditional MVC pattern that we have used for years on the backend. But Backbone was created before the web really started to gain momentum. We are building very different apps today, than what we did just a few years ago.

Backbone is strong thinking Models and Collections as state, but modern web applications has a lot more state than just Models and Collections. The state I am talking about is the state you lock up in your views. Application state. 

Baobone uses the FLUX architecture to free your from this state constraint, but still use familiar Backbone concepts.

## Creating state

### Define the state
```javascript
var Baobone = require('Baobone');

// Will pass a model and a view to component
GEL.state('profile', {
  url: '/profile',
  model: {
    username: String,
    notifications: Array
  },
  view: {
    showNotifications: false
  }
});

// Will pass a collection and a view to component
GEL.state('profile', {
  url: '/profile',
  collection: {
    username: String,
    notifications: Array
  },
  view: {
    showNotifications: false
  }
});

// You can also create a pure model/collection/view state
```

### Use the state
```javascript
var ProfileComponent = React.createClass({
  mixins: [GEL.mixin('profile')],
  componentWillMount: function () {
    GEL.fetch('profile');
  },
  toggleNotifications: function () {
    GEL.view('profile', {
      showNotifications: !this.view('showNotifications')
    });
  },
  renderNotification: function (notification) {
    return <strong>{notification}</strong>
  },
  render: function () {

    if (this.status('isFetching')) {
      return <div class="loader"></div>
    }

    return (
      <div>
        <h1>Hi {this.model('username')}</h1>
        {
          this.view('showNotifications') ? 
          this.model('notifications').map(this.renderNotification) : 
          null
        }
        <button onClick={this.toggleNotifications}>
          Toggle notifications
        </button>
      </div>
    )
  }
});
```

#### Methods

##### this.view(key)
Get view state

##### this.model(key)
Get model state

##### this.collection()
Get collection state

##### this.params(key)
Get params used in fetching (itemsPrPage etc.)

##### this.status(key)
Get the status of the state (isFetching, hasError)

### A more complex example
```javascript

/* STATE */
GEL.state('tasks', {
  url: '/tasks',
  collection: {
    id: String,
    description: String
  },
  parse: function () {
    this.view.totalPages = response.meta.totalPages;
    return response.rows.map(function (task) {
      return {
        id: task.id,
        description: task.description
      };
    });
  },
  params: {
    itemsPrPage: 10,
    offset: 0
  },
  view: {
    columns: ['id', 'description'],
    totalPages: 1
  }
});

/* COMPONENT */
var TasksComponent = React.createClass({
  mixins: [GEL.mixin('tasks')],
  componentWillMount: function () {
    GEL.fetch('tasks');
  },
  changePage: function (page) {
    GEL.fetch('tasks', {
      offset: page -1
    });
  },
  render: function () {
    return (
      <DataTable 
        isLoading={this.status('isFetching')}
        data={this.collection()}
        columns={this.view('columns')}
        itemsPrPage={this.params('itemsPrPage')}
        currentPage={this.params('offset') + 1}
        onPageChange={this.changePage}
      />
    );
  }
});
```

