var is = require('./is.js');
var error = require('./error.js');

module.exports = {
  modelValidator: function (model) {

    if (!is.object(model)) {
      error('You have to pass an object as a model');
    }

    Object.keys(model).forEach(function (key) {
      if (!is.constructor(model[key])) {
        error('The model properties has to be basic JS constructors. String, Number, Boolean, Object or Array');
      }
    });

  },
  view: function (view) {

    if (!is.object(view)) {
      error('You have to pass an object as a view');
    }

    Object.keys(view).forEach(function (key) {
      if (!is.validConstructor) {
        error('You have created a view with a property that is not valid. Property: ' + key);
      }
    });

  },
  modelView: function (modelView) {
    
    if (!is.string(modelView.url)) {
      error('You have to pass an url to your ModelView');
    }

    this.modelValidator(modelView.model);
    this.view(modelView.view);

  },
  model: function (model) {

    if (!is.string(modelView.url)) {
      error('You have to pass an url to your Model');
    }

    this.modelValidator(modelView.model);
    
  },
  collection: function (collection) {

    if (!is.string(collection.url)) {
      error('You have to pass an url to your Collection');
    }

    this.modelValidator(collection.model);
    
  },
  collectionView: function (collectionView) {
   
    if (!is.string(collectionView.url)) {
      error('You have to pass an url to your CollectionView');
    }

    this.modelValidator(collectionView.model);
    this.view(collectionView.view);

  },
  cursor: function (cursor) {

    var states = ['CollectionView', 'ModelView', 'Model', 'Collection', 'View'];
    var cursorData;
    try {
      cursorData = cursor.get();
      if (!cursorData.type || states.indexOf(cursorData.type) === -1) {
        throw new Error()
      }
    } catch (e) {
      error('You tried to grab data or mixin from an invalid cursor');
    }
    return true;

  },
  modelModification: function (modelModification, modelValidator) {
    
    if (!is.object(modelModification)) {
      error('You have not passed an object to save');
    }

    Object.keys(modelModification).forEach(function (key) {

      if (!(key in modelValidator)) {
        error('You have passed an invalid property on your model. Valid properties are ' + Object.keys(modelValidator).join(','));
      }
      if (!is.fromConstructor(modelModification[key], modelValidator[key])) {
        error('You have passed an invalid value on your model. Property: ' + key + ', should be a ' + modelValidator[key].toString());
      }
      
    });

  }
};
