const {format} = require('util');

module.exports = tag => {
  return (message, ...data) => {
    console.log(format(`[${tag}] ${message}`, data))
  };
};

