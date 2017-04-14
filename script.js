'use strict';

const {Git, TotalReport, CommitsReport} = require('./index');
const argv = require('yargs').argv;
const {folder, after, before} = argv;
const reports = [TotalReport, CommitsReport];

if (!folder) {
  throw new Error('You have to pass `--folder` (via `yarn start -- ---folder path/to/folder` where git project is.');
}

const git = new Git({folder});
git.stat(after, before).then(collection => {
  if (!Object.keys(collection).length) {
    throw new Error('There is no history for this project. May be the folder is incorrect?');
  }

  return reports.map(Report => {
    const report = new Report({collection});
    const data = report.generate();
    return report.render(data);
  });
}).then(blocks => {
  console.log('\n' + blocks.join('\n\n') + '\n');
}).catch(error => {
  console.error(error);
});
