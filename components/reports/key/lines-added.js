const { merge } = require('./../../../helpers');
const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(merge({
      key: 'linesAdded',
      tableTitle: 'Lines added report',
      columnTitle: 'Added'
    }, options));
  }
};
