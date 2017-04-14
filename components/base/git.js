'use strict';

const exec = require('child_process').exec;
const moment = require('moment');

module.exports = class {

  constructor(options) {
    this.configure(options);
  }

  configure(options) {
    for (let i in options) {
      this[i] = options[i];
    }
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
    return new Promise((resolve, reject) => {
      const git = this.compileLogCommand(this.folder, after, before);
      const command = `${git} --format='%aE' | sort -u | while read name; do echo "{\\\"email\\\": \\\"$name\\\", "; ${git} --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "\\\"added\\\": \\\"%s\\\", \\\"removed\\\": \\\"%s\\\", \\\"diff\\\": \\\"%s\\\"};", add, subs, loc }' -; done`;

      exec(command, (error, stdout) => {
        if (error) {
          return reject(error);
        }

        // clean up command results
        const records = stdout.replace(/(\r|\n)/g, '').split(';').filter(item => item);

        // parse results as js objects
        const collection = records.reduce((stack, record) => {
          const item = JSON.parse(record);
          const linesAdded = parseInt(item.added || 0);
          const linesRemoved = parseInt(item.removed || 0);
          const linesAffected = linesAdded + Math.abs(linesRemoved);
          const linesDiff = parseInt(item.diff || 0);

          stack[item.email] = {linesAdded, linesRemoved, linesAffected, linesDiff};
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

      exec(command, (error, stdout) => {
        if (error) {
          return reject(error);
        }

        const collection = stdout.split('\n').reduce((stack, record) => {
          const [count, email] = record.trim().replace(/\s+/, ';').split(';');
          const commitsPushed = count ? parseInt(count) : 0;
          stack[email] = {commitsPushed};
          return stack;
        }, {});

        resolve(collection);
      });
    });
  }

  stat(after = null, before = null) {
    return this.statLines(after, before).then(linesStory => {
      return this.statCommits(after, before).then(commitsStory => {
        let result = {};
        for (let email in linesStory) {
          const id = email;
          result[id] = Object.assign({}, linesStory[email], commitsStory[email], {id, email});
        }

        return result;
      });
    });
  }
};
