const { merge } = require('./../../../helpers');
const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(merge({
      key: 'linesRemoved',
      tableTitle: 'Lines removed report',
      columnTitle: 'Removed'
    }, options));
  }
};
