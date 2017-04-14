'use strict';

const Report = require('./../base/report');
const Table = require('./../base/table');

module.exports = class extends Report {

  generate() {
    const collection = this.calculate(this.property).collection;
    return Object.values(collection);
  }

  render(records) {
    const title = this.title;
    const header = ['User name', 'Percents value', this.title];

    const data = records.map(record => ([
      {type: 'string', value: record.email},
      {type: 'progress', value: record.percents},
      {type: 'number', value: record[this.property]}
    ]));

    const table = new Table({title, header, data});
    return table.render();
  }
};
