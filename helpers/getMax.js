'use strict';

module.exports = function(defaults, value) {
  return defaults === false || value > defaults ? value : defaults;
};
