'use strict';

const {getMax} = require('./../../helpers');
const Report = require('./../base/report');
const Table = require('./../base/table');

module.exports = class extends Report {

  generate() {
    const collection = this.calculate('commitsPushed').collection;
    return Object.values(collection);
  }

  render(records) {
    const title = 'Commits rating';
    const header = ['User name', 'Percents value', 'Commits pushed'];

    const data = records.map(record => ([
      {type: 'string', value: record.email},
      {type: 'progress', value: record.percents},
      {type: 'number', value: record.commitsPushed}
    ]));

    const table = new Table({title, header, data});
    return table.render();
  }
};
