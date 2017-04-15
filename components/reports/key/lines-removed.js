'use strict';

const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(Object.assign({
      key: 'linesRemoved',
      tableTitle: 'Lines removed report',
      columnTitle: 'Count'
    }, options));
  }
};
