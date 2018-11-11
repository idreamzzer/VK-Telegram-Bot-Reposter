const telegram = require("./api/telegram");
const logger = require("./utils/logger");

module.exports = () => {
  telegram.on("error", async err => {
    logger.error("Unexpected error occurred");
    logger.error(err);
    process.exit();
  });

  // Restart bot on error
  process.on("uncaughtException", function(e) {
    logger.error(
      "An error has occured. error is: %s and stack trace is: %s",
      e,
      e.stack
    );
    logger.error("Process will restart now.");
    process.exit();
  });
};
