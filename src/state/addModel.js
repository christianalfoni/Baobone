var state = require('./../state.js');
var createCursorSelector = require('./../utils/createCursorSelector.js');
var is = require('./../utils/is.js');
var verify = require('./../utils/verify.js');
var safeExtend = require('./../utils/safeExtend.js');
var error = require('./../utils/error.js');

module.exports = function (cursorDescription, model) {

  if (!is.string(cursorDescription) || !is.object(model)) {
    error('You have to pass a string and an object to create a ModelView');
  }

  var cursorSelector = createCursorSelector(cursorDescription);

  verify.model(model);

  // Set type
  model.type = 'Model';

  // Create cursor data that is retrieved
  model.cursorData = {};

  state.select(cursorSelector).edit(model);

};
