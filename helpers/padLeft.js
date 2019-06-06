module.exports = function (str, symbol, length) {
  const pad = symbol.repeat(length);
  return (pad + str).slice(-pad.length);
};
