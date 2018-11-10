const telegram = require("../api/telegram");
const {
  logMessage,
  errorMessage
} = require("./logMessages");
const config = require("../config.json");

module.exports = async post => {
  let text = post.text;
  if (text.length > 0) {
    try {
      logMessage("Trying to send post");
      const msg = await telegram
        .sendMessage(-config.telegram.channelId, text, {
          parse_mode: "HTML"
        });
      logMessage("Message successfully sent");
    } catch (error) {
      errorMessage(`Couldn't send message text to telegram`);
      errorMessage(error);
    }
  }
};