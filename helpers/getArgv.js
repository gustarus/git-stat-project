module.exports = function (raw) {
  let result = {};
  let clone = raw.slice();
  while (clone.length) {
    const item = clone.shift();
    if (item.indexOf('--') === 0) {
      const key = item.slice(2);
      if (clone.length && clone[0].indexOf('--') !== 0) {
        result[key] = clone.shift();
      }
    }
  }

  return result;
};
