module.exports = function (defaults, value) {
  return typeof defaults !== 'number' || value < defaults ? value : defaults;
};
