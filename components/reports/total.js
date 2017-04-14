'use strict';

const {getMax} = require('./../../helpers');
const Report = require('./../base/report');
const Table = require('./../base/table');

const COMMITS_K = 0.4;
const LINES_K = 1 - COMMITS_K;

module.exports = class extends Report {

  generate() {
    // generate statistic collections
    const collection = this.collection;
    const commits = this.calculate('commitsPushed');
    const lines = this.calculate('linesAffected');

    // generate formatted result collection
    let maxEmailLength = false;
    const formatted = Object.values(collection).map(record => {
      const commitsRecord = commits.collection[record.id];
      const linesRecord = lines.collection[record.id];

      // calculate total percents
      const commitsTotal = commitsRecord.percents * COMMITS_K;
      const linesTotal = linesRecord.percents * LINES_K;
      const percents = commitsTotal + linesTotal;

      // get maximum values
      maxEmailLength = getMax(maxEmailLength, record.email.length);

      return Object.assign({}, record, {percents});
    }).sort((a, b) => b.percents - a.percents);

    return formatted.map(record => ([
      {type: 'string', value: record.email},
      {type: 'progress', value: record.percents},
      {type: 'number', value: record.commitsPushed},
      {type: 'number', value: record.linesAffected}
    ]));
  }

  render(data) {
    const title = 'Total rating';
    const header = ['User name', 'Percents value', 'Commits pushed', 'Lines affected'];
    const table = new Table({title, header, data});
    return table.render();
  }
};
