var state = require('./../state.js');
var createCursorSelector = require('./../utils/createCursorSelector.js');
var is = require('./../utils/is.js');
var verify = require('./../utils/verify.js');
var safeExtend = require('./../utils/safeExtend.js');
var error = require('./../utils/error.js');

module.exports = function (cursorDescription, collection) {

  if (!is.string(cursorDescription) || !is.object(collection)) {
    error('You have to pass a string and an object to create a ModelView');
  }

  var cursorSelector = createCursorSelector(cursorDescription);

  verify.collection(collection);

  // Set type
  collection.type = 'Collection';

  // Create cursor data that is retrieved
  collection.cursorData = [];

  state.select(cursorSelector).edit(collection);

};
