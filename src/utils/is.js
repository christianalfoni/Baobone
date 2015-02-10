var error = require('./error.js');
var validConstructors = [Object, Array, String, Number, Boolean];
module.exports = {
  string: function (string) {
    return typeof string === 'string';
  },
  object: function (object) {
    return typeof object === 'object' && object !== null && !(object instanceof Array);
  },
  constructor: function (Constructor) {
    return validConstructors.indexOf(Constructor) >= 0;
  },
  fromConstructor: function (value, constructor) {
    return value.constructor === constructor;
  },
  validConstructor: function (value) {
    return validConstructors.indexOf(value.constructor) >= 0;
  }
}
