'use strict';

const PropertyReport = require('./property');

module.exports = class extends PropertyReport {

  constructor(options = {}) {
    options.property = 'linesRemoved';
    options.title = 'Lines removed';
    super(options);
  }
};
