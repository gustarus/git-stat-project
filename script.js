'use strict';

const stat = require('./index');
const {helpers, Log, GitProject, CommitsReport, LinesAffectedReport, LinesDiffReport} = stat;
const {getArgv} = helpers;

const {folder, before, after} = getArgv(process.argv);
const reports = [CommitsReport, LinesAffectedReport, LinesDiffReport];

const log = new Log();
const git = new GitProject({folder});
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
