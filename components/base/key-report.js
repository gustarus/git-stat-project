'use strict';

const Report = require('./report');
const Table = require('./table');

module.exports = class extends Report {

  generate() {
    const collection = this.calculate(this.key).collection;
    return Object.values(collection);
  }

  render(records) {
    const title = this.tableTitle;
    const header = ['User name', 'Percents value', this.columnTitle];

    const data = records.map(record => ([
      {type: 'string', value: record.email},
      {type: 'progress', value: record.percents},
      {type: 'number', value: record[this.key]}
    ]));

    const table = new Table({title, header, data});
    return table.render();
  }
};
