'use strict';

const argv = require('yargs').argv;
const {folder, after, before} = argv;

const components = require('./index');
const {Log, GitProject, GeneralReport, CommitsReport, LinesAffectedReport, LinesDiffReport} = components;
const reports = [GeneralReport, CommitsReport, LinesAffectedReport, LinesDiffReport];

const log = new Log();
const git = new GitProject({folder, verbose: true});
git.stat(after, before).then(collection => {
  if (!Object.keys(collection).length) {
    throw new Error('There is no history for this project. May be the folder is incorrect?');
  }

  return reports.map(Report => {
    const report = new Report({collection});
    const records = report.generate();
    return report.render(records);
  });
}).then(blocks => {
  log.info('\n' + blocks.join('\n\n') + '\n');
}).catch(error => {
  log.error(`\n${error.stack}\n`);
  process.exit(1);
});
