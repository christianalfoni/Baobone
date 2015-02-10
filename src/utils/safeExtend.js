var error = require('./error.js');

module.exports = function (target, source) {
  Object.keys(source).forEach(function (key) {
    if (key in target) {
      error('You are defining a default key in your view: ' + key);
    }
    target[key] = source[key];
  });
};
