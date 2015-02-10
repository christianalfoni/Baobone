module.exports = function () {
  var args = [].slice.call(arguments, 0); // Convert to array
  var target = args.shift(); // Get target, leave reset of objects in array
  args.forEach(function (object) {
    Object.keys(object).forEach(function (key) {
      target[key] = object[key];
    });
  });
  return target;
};
