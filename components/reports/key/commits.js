'use strict';

const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(Object.assign({
      key: 'commitsPushed',
      tableTitle: 'Commits pushed report',
      columnTitle: 'Count'
    }, options));
  }
};
