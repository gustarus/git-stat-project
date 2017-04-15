'use strict';

const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(Object.assign({
      key: 'linesAffected',
      tableTitle: 'Lines affected report (added plus removed)',
      columnTitle: 'Count'
    }, options));
  }
};
