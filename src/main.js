var GELState = {};

/*
 * ACTIONS 
 */
GELState.actions = {
  'save': require('./actions/save.js')
};

/*
 * ADD STATE
 */
GELState.addModelView = require('./state/addModelView.js');
GELState.addCollectionView = require('./state/addCollectionView.js');
GELState.addModel = require('./state/addModel.js');
GELState.addView = require('./state/addView.js');
GELState.addCollection = require('./state/addCollection.js');

/*
 * GET STATE
 */
 GELState.mixin = require('./state/getMixin.js');
 GELState.get = require('./state/getState.js');

module.exports = GELState;
