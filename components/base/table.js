'use strict';

const chalk = require('chalk');
const Base = require('./base');
const {merge, padLeft, padRight} = require('./../../helpers');

const CHAR_DELIMITER = '|';
const CHAR_EMPTY = '░';
const CHAR_FILL = '█';

module.exports = class extends Base {

  constructor(options) {
    super(merge({
      progressSize: 50,
      progressDirection: 'plus'
    }, options));
  }

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
        return this.progressSize;
        break;

      default:
        return ('' + cell.value).length;
        break;
    }
  }

  getProgress(size, value, direction) {
    const k = direction === 'both' ? 0.5 : 1;
    const positive = Math.abs(value);

    const symbol = CHAR_DELIMITER;
    const filled = CHAR_FILL.repeat(Math.ceil(positive * k));
    const append = CHAR_EMPTY.repeat(Math.floor((size - positive) * k));
    switch (direction) {
      case 'plus':
        return symbol + filled + append;
      case 'minus':
        return append + filled + symbol;
      case 'both':
        if (size % 2 !== 0) {
          throw new Error('You want to build both-directional progress bar, but the size is not even.');
        }

        const empty = CHAR_EMPTY.repeat(size * k);
        return value > 0
          ? empty + symbol + filled + append
          : append + filled + symbol + empty;
      default:
        throw new Error('Only \'plus\', \'minus\' and \'both\' are allowed as \'progressDirection\' property');
    }
  }

  getCellValue(cell, size) {
    switch (cell.type) {
      case 'progress':
        const length = Math.ceil(this.progressSize / 100 * cell.value);
        return this.getProgress(this.progressSize, length, this.progressDirection);

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
