'use strict';

const chalk = require('chalk');
const Base = require('./base');
const {padLeft, padRight} = require('./../../helpers');

module.exports = class extends Base {

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

  generate() {
    throw new Error('You have to override this method');
  }
};
