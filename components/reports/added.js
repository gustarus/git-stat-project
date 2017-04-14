'use strict';

const PropertyReport = require('./property');

module.exports = class extends PropertyReport {

  constructor(options = {}) {
    options.property = 'linesAdded';
    options.title = 'Lines added';
    super(options);
  }
};
