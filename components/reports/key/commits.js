const { merge } = require('./../../../helpers');
const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(merge({
      key: 'commitsPushed',
      tableTitle: 'Commits pushed report',
      columnTitle: 'Commits'
    }, options));
  }
};
