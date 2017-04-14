'use strict';

const {Git, TotalReport} = require('./index');
const argv = require('yargs').argv;
const {folder, after, before} = argv;
const reports = [TotalReport];

if (!folder) {
  throw new Error('You have to pass `--folder` (via `yarn start -- ---folder path/to/folder` where git project is.');
}

const git = new Git({folder});
git.stat(after, before).then(collection => {
  return reports.map(Report => {
    const report = new Report({collection});
    return report.generate();
  });
}).then(blocks => {
  console.log('\n' + blocks.join('\n') + '\n');
});


