const log4js = require("log4js");

module.exports = (() => {
  const logger = log4js.getLogger();
  logger.level = "debug";
  return logger;
})();
