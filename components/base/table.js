'use strict';

const chalk = require('chalk');
const Base = require('./base');
const {padLeft, padRight} = require('./../../helpers');

const PROGRESS_SIZE = 33;

module.exports = class extends Base {

  getColsSizes(header, data) {
    let sizes = [];
    for (let i in header) {
      sizes[i] = ('' + header[i]).length;
    }

    for (let i in data) {
      for (let ii in data[i]) {
        const cell = data[i][ii];
        const size = this.getCellSize(cell);
        sizes[ii] = size > sizes[ii]
          ? size : sizes[ii];
      }
    }

    return sizes;
  }

  getCellSize(cell) {
    switch (cell.type) {
      case 'progress':
        return PROGRESS_SIZE;
        break;

      default:
        return ('' + cell.value).length;
        break;
    }
  }

  getCellValue(cell, size) {
    switch (cell.type) {
      case 'progress':
        const length = Math.ceil(PROGRESS_SIZE / 100 * cell.value);
        return '█'.repeat(length) + '░'.repeat(PROGRESS_SIZE - length);
        break;

      case 'number':
        return padLeft(cell.value, ' ', size);
        break;

      default:
        return padRight(cell.value, ' ', size);
        break;
    }
  }

  render() {
    const {title, header, data} = this;

    const sizes = this.getColsSizes(header, data);

    const headerPadded = header.map((value, i) => {
      return padRight(value, ' ', sizes[i]);
    });

    const dataPadded = data.map(row => {
      const rowPadded = row.map((cell, i) => {
        return this.getCellValue(cell, sizes[i]);
      });

      return '  ' + rowPadded.join('  ');
    });

    return `${chalk.blue(title)}\n${'  ' + chalk.bold(headerPadded.join('  '))}\n${dataPadded.join('\n')}`;
  }
};
