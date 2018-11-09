const telegram = require("./api/telegram");
const { logMessage, errorMessage } = require("./helpers/logMessages");

module.exports = () => {
  // On telegram bot polling error restart app after 10 sec
  telegram.on("polling_error", async err => {
    errorMessage("POLLING ERROR");
    errorMessage(err);
    telegram.reconnectWithProxy();
  });

  // Check telegram polling every 5sec. If it is not working restart app
  setTimeout(async () => {
    if (!telegram.isPolling()) {
      errorMessage(`Telegram bot is NOT polling`);
      telegram.reconnectWithProxy();
    }
  }, 5000);

  // Restart bot on error
  process.on("uncaughtException", function(e) {
    errorMessage(
      "An error has occured. error is: %s and stack trace is: %s",
      e,
      e.stack
    );
    errorMessage("Process will restart now.");
    process.exit();
  });
};
