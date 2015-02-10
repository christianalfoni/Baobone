module.exports = function (message, url) {
  throw new Error(message + ' For more information: ' + (url || ''));
};
