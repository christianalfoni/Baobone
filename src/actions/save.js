var state = require('./../state.js');
var createCursorSelector = require('./../utils/createCursorSelector.js');
var verify = require('./../utils/verify.js');
var extend = require('./../utils/extend.js');

module.exports = function (cursorDescription, modelModification) {

  var cursorSelector = createCursorSelector(cursorDescription);
  var cursor = state.select(cursorSelector);
  
  verify.cursor(cursor);

  var stateData = cursor.get();
  var modelValidator = stateData.model;
  var oldModel = stateData.cursorData.model;

  verify.modelModification(modelModification, modelValidator);

  var newModel = extend({}, oldModel, modelModification);
  cursor.select('cursorData').set('model', newModel);
  cursor.select('cursorData', 'view').set('isSaving', true);

  state.commit();

  // Do a patch to the server with the modelModification object
  // Revert to oldModel and set error if it fails

};
