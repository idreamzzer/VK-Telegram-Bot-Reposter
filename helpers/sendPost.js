const telegram = require("../api/telegram");
const logger = require("../utils/logger");
const config = require("../config.json");

module.exports = async post => {
  let text = post.text;
  if (text.length > 0) {
    try {
      logger.debug("Trying to send post");
      await telegram.sendMessage(-config.telegram.channelId, text, {
        parse_mode: "HTML"
      });
      logger.debug("Message successfully sent");
    } catch (error) {
      logger.error(`Couldn't send message text to telegram`);
      logger.error(error);
    }
  }
};
