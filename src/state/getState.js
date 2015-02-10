var state = require('./../state.js');
var createCursorSelector = require('./../utils/createCursorSelector.js');

module.exports = function (cursorDescription) {
  var cursorSelector = createCursorSelector(cursorDescription);
  return state.select(cursorSelector).select('cursorData').get();
};
