'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const moment = require('moment');
const Base = require('./base');
const Log = require('./log');
const {merge} = require('./../../helpers');

const log = new Log();
module.exports = class extends Base {

  constructor(options) {
    super(merge({
      folder: null,
      verbose: false
    }, options));
  }

  compileDateFilter(name, value) {
    if (!value) {
      return '';
    }

    return `--${name}="${moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD')}"`;
  }

  compileLogCommand(folder, after, before) {
    const target = `${folder}/.git`;
    const command = ['git', '--git-dir', target, 'log',
      this.compileDateFilter('after', after),
      this.compileDateFilter('before', before)
    ];

    return command.join(' ').trim();
  }

  statLines(after = null, before = null) {
    if (!this.folder) {
      throw new Error('You have to pass `--folder` (via `yarn start -- ---folder path/to/folder` where git project is.');
    }

    return new Promise((resolve, reject) => {
      const git = this.compileLogCommand(this.folder, after, before);
      const command = `${git} --format='%aE' | sort -u | while read name; do echo "{\\\"email\\\": \\\"$name\\\", "; ${git} --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "\\\"added\\\": \\\"%s\\\", \\\"removed\\\": \\\"%s\\\", \\\"diff\\\": \\\"%s\\\"};", add, subs, loc }' -; done`;

      if (this.verbose) {
        log.warning('\nExecute git lines stat command');
        log.info(command, 1);
      }

      exec(command, (error, stdout) => {
        if (error) {
          return reject(error);
        }

        // clean up command results
        const records = stdout.replace(/(\r|\n)/g, '').split(';').filter(item => item);

        // parse results as js objects
        const collection = records.reduce((stack, record) => {
          const item = JSON.parse(record);
          const email = item.email || 'incognito';
          const linesAdded = parseInt(item.added || 0);
          const linesRemoved = parseInt(item.removed || 0);
          const linesAffected = linesAdded + Math.abs(linesRemoved);
          const linesDiff = parseInt(item.diff || 0);

          stack[email] = {linesAdded, linesRemoved, linesAffected, linesDiff};
          return stack;
        }, {});

        resolve(collection);
      });
    });
  }

  statCommits(after = null, before = null) {
    return new Promise((resolve, reject) => {
      const git = this.compileLogCommand(this.folder, after, before);
      const command = `${git} --pretty=format:"%aE"| env LC_ALL=C sort| env LC_ALL=C uniq -c| env LC_ALL=C sort -r`;

      if (this.verbose) {
        log.warning('\nExecute git commits stat command');
        log.info(command, 1);
      }

      exec(command, (error, stdout) => {
        if (error) {
          return reject(error);
        }

        const collection = stdout.split('\n').reduce((stack, record) => {
          const [countRaw, emailRaw] = record.trim().replace(/\s+/, ';').split(';');
          const email = emailRaw || 'incognito';
          const commitsPushed = countRaw ? parseInt(countRaw) : 0;
          stack[email] = {commitsPushed};
          return stack;
        }, {});

        resolve(collection);
      });
    });
  }

  stat(after = null, before = null) {
    return new Promise(resolve => {
      if (!this.folder) {
        throw new Error('You have to pass \'folder\' property to this class in the constructor.');
      }

      if (!fs.existsSync(`${this.folder}/.git`)) {
        throw new Error(`Folder \'${this.folder}\' is not a git project.`);
      }

      this.statLines(after, before).then(linesStory => {
        this.statCommits(after, before).then(commitsStory => {
          let result = {};
          for (let email in linesStory) {
            const id = email;
            result[id] = Object.assign({}, linesStory[email], commitsStory[email], {id, email});
          }

          resolve(result);
        });
      });
    });
  }
};
