var ReactAddons = require('react-addons');
var Baobab = require('baobab');
var CursorToStateMixin = require('./CursorToStateMixin.js');

module.exports = new Baobab({}, {
  mixins: [ReactAddons.PureRenderMixin, CursorToStateMixin],
  shiftReferences: true,
  autoCommit: false
});
