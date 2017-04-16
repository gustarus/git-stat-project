const {merge} = require('./../../../helpers');
const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(merge({
      key: 'linesAffected',
      tableTitle: 'Lines affected report (added plus removed)',
      columnTitle: 'Affected'
    }, options));
  }
};
