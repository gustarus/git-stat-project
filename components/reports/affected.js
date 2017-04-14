'use strict';

const PropertyReport = require('./property');

module.exports = class extends PropertyReport {

  constructor(options = {}) {
    options.property = 'linesAffected';
    options.title = 'Lines affected';
    super(options);
  }
};
