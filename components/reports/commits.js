'use strict';

const {getMax} = require('./../../helpers');
const Report = require('./../base/report');
const Table = require('./../base/table');

module.exports = class extends Report {

  generate() {
    const history = this.calculate('commitsPushed');
    return Object.values(history.collection).map(record => ([
      {type: 'string', value: record.email},
      {type: 'progress', value: record.percents},
      {type: 'number', value: record.commitsPushed}
    ]));
  }

  render(data) {
    const title = 'Commits rating';
    const header = ['User name', 'Percents value', 'Commits pushed'];
    const table = new Table({title, header, data});
    return table.render();
  }
};
