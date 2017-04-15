'use strict';

const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(Object.assign({
      key: 'linesDiff',
      tableTitle: 'Lines diff report (added minus removed)',
      columnTitle: 'Count'
    }, options));
  }
};
