var moveCursor = function (state) {
  var cursor = state.cursor;
  delete state.cursor;
  Object.keys(cursor).forEach(function (key) {
    state[key] = cursor[key];
  });
};

module.exports = {
  componentWillMount: function () {
    moveCursor(this.state);
  },
  componentWillUpdate: function (nextProps, nextState) {
    moveCursor(nextState);
  }
};
