module.exports = function (cursorDescription) {
  if (typeof cursorDescription !== 'string' || !cursorDescription.length) {
    throw new Error('You are not passing a valid cursor. It has to be a string');
  }
  var cursorSelector = cursorDescription.split('.');
  return cursorSelector;
};
