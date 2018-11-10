const telegram = require("./api/telegram");
const {
  logMessage,
  errorMessage
} = require("./helpers/logMessages");

module.exports = () => {
  telegram.on("polling_error", async err => {
    errorMessage("POLLING ERROR");
    errorMessage(err);
    setTimeout(() => process.exit(), 10000);
  });

  // Restart bot on error
  process.on("uncaughtException", function (e) {
    errorMessage(
      "An error has occured. error is: %s and stack trace is: %s",
      e,
      e.stack
    );
    errorMessage("Process will restart now.");
    process.exit();
  });
};