'use strict';

const {merge} = require('./../../../helpers');
const KeyReport = require('./../../base/key-report');

module.exports = class extends KeyReport {

  constructor(options) {
    super(merge({
      key: 'linesDiff',
      progressDirection: 'both',
      tableTitle: 'Lines diff report (added minus removed)',
      columnTitle: 'Count'
    }, options));
  }
};
