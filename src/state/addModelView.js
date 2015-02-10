var state = require('./../state.js');
var createCursorSelector = require('./../utils/createCursorSelector.js');
var is = require('./../utils/is.js');
var verify = require('./../utils/verify.js');
var safeExtend = require('./../utils/safeExtend.js');
var error = require('./../utils/error.js');

module.exports = function (cursorDescription, modelView) {

  if (!is.string(cursorDescription) || !is.object(modelView)) {
    error('You have to pass a string and an object to create a ModelView');
  }

  var cursorSelector = createCursorSelector(cursorDescription);

  verify.modelView(modelView);

  // Add default view properties
  var viewDefaults = {
    isFetching: false,
    isSaving: false,
    error: null
  };
  safeExtend(modelView.view, viewDefaults);

  // Set type
  modelView.type = 'ModelView';

  // Create cursor data that is retrieved
  modelView.cursorData = {
    model: {},
    view: modelView.view
  };


  state.select(cursorSelector).edit(modelView);

  state.commit();

};
