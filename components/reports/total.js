'use strict';

const {getMax, padRight, padLeft} = require('helpers');
const Report = require('components/base/report');

const COMMITS_K = 0.4;
const PROGRESS_LENGTH = 40;
const EMAIL_LENGTH = 30;
const LINES_K = 1 - COMMITS_K;

module.exports = class extends Report {

  generate() {
    // generate statistic collections
    const collection = this.collection;
    const commits = this.calculate('commitsPushed');
    const lines = this.calculate('linesAffected');

    // generate formatted result collection
    let maxEmailLength = false;
    let maxTotalPercents = false;
    const formatted = Object.values(collection).map(record => {
      const commitsRecord = commits.collection[record.id];
      const linesRecord = lines.collection[record.id];

      // calculate total percents
      const commitsTotal = commitsRecord.percents * COMMITS_K;
      const linesTotal = linesRecord.percents * LINES_K;
      const total = (commitsTotal + linesTotal) / 2;

      // get maximum values
      maxEmailLength = getMax(maxEmailLength, record.email.length);
      maxTotalPercents = getMax(maxTotalPercents, total);

      return Object.assign({}, record, {total});
    }).sort((a, b) => b.total - a.total);


    const header = [
      padRight('User name', ' ', maxEmailLength),
      padRight('Percents value', ' ', PROGRESS_LENGTH),
      'Commits pushed',
      'Lines affected'
    ];

    const commitsPadLength = header[2].length;
    const linesPadLength = header[3].length;

    const k = PROGRESS_LENGTH / maxTotalPercents;
    const data = formatted.map(record => {
      const value = Math.ceil(record.total * k);
      const emailColumn = this.colorize(padRight(record.email, ' ', maxEmailLength), record.total);
      const progressColumn = this.progress(value, PROGRESS_LENGTH);
      const commitsColumn = padLeft(record.commitsPushed, ' ', commitsPadLength);
      const linesColumn = padLeft(record.linesAffected, ' ', linesPadLength);
      return [emailColumn, progressColumn, commitsColumn, linesColumn];
    });

    return this.table('Total rating', header, data);
  }
};
