'use strict';

const chalk = require('chalk');

module.exports = class {

  constructor(options) {
    this.configure(options);
  }

  configure(options) {
    for (let i in options) {
      this[i] = options[i];
    }
  }

  calculate(property) {
    const records = this.collection;

    // sort collection by property
    const sorted = Object.values(records)
      .sort((a, b) => b[property] - a[property]);

    // get property thresholds
    const min = sorted[sorted.length - 1][property];
    const max = sorted[0][property];

    // calculate percents values and build a result
    const k = 100 / max;
    const collection = sorted.reduce((stack, item) => {
      const percents = item[property] * k || 0;
      stack[item.id] = Object.assign({}, item, {percents});
      return stack;
    }, {});

    return {collection, min, max};
  }

  colorize(text, percents) {
    if (percents < 100 / 3) {
      return chalk.red(text);
    } else if (percents < 100 / 2) {
      return chalk.yellow(text);
    } else {
      return text;
    }
  }

  table(title, header, data) {
    const rows = data.map(row => '  ' + row.join('  '));
    return `${chalk.blue(title)}\n${'  ' + chalk.bold(header.join('  '))}\n${rows.join('\n')}`;
  }

  progress(value, length) {
    return '█'.repeat(value) + '░'.repeat(length - value);
  }
};
