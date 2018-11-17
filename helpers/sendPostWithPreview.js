const telegram = require("../api/telegram");
const logger = require("../utils/logger");
const config = require("../config");

module.exports = (post, preview) => {
  let text = post.text;
  if (text.length <= 1024) {
    _sendPreviewWithCaption(preview, text);
  } else {
    _sendPreviewLinkAfterText(preview, text);
  }
};

async function _sendPreviewWithCaption(preview, text) {
  try {
    logger.debug("Trying to send photo with caption");
    if (preview.type === "photo") {
      await telegram.sendPhoto(-config.telegram.channelId, preview.url, {
        caption: text,
        parse_mode: "HTML"
      });
      logger.debug("Message successfully sent");
    } else if (preview.type === "doc") {
      await telegram.sendDocument(-config.telegram.channelId, preview.url, {
        caption: text,
        parse_mode: "HTML"
      });
      logger.debug(`Message successfully sent`);
    } else {
      throw "Unknown preview type";
    }
  } catch (error) {
    logger.error(`Couldn't send photo with caption to telegram channel`);
    logger.error(error);
  }
}

async function _sendPreviewLinkAfterText(preview, text) {
  let previewLink = `<a href="${preview.url}">&#160;</a>`;
  text = text + "\n" + previewLink;
  try {
    logger.debug("Trying to send preview link after text message");
    await telegram.sendMessage(-config.telegram.channelId, text, {
      parse_mode: "HTML"
    });
    logger.debug(`Message successfully sent`);
  } catch (error) {
    logger.error(`Couldn't send photo and text separate to telegram channel`);
    logger.error(error);
  }
}
