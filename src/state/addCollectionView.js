var state = require('./../state.js');
var createCursorSelector = require('./../utils/createCursorSelector.js');
var is = require('./../utils/is.js');
var verify = require('./../utils/verify.js');
var safeExtend = require('./../utils/safeExtend.js');
var error = require('./../utils/error.js');

module.exports = function (cursorDescription, collectionView) {

  if (!is.string(cursorDescription) || !is.object(collectionView)) {
    error('You have to pass a string and an object to create a CollectionView');
  }

  var cursorSelector = createCursorSelector(cursorDescription);

  verify.collectionView(modelView);

  // Add default view properties
  var viewDefaults = {
    isFetching: false,
    isSaving: false,
    error: null
  };
  safeExtend(collectionView.view, viewDefaults);

  // Set type
  collectionView.type = 'CollectionView';

  // Create cursor data that is retrieved
  collectionView.cursorData = {
    collection: [],
    view: collectionView.view
  };

  state.select(cursorSelector).edit(collectionView);

};
