'use strict';

const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(Object.assign({
      key: 'linesAdded',
      tableTitle: 'Lines added report',
      columnTitle: 'Count'
    }, options));
  }
};
