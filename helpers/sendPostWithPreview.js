const telegram = require("../api/telegram");
const { logMessage, errorMessage } = require("./logMessages");
const config = require("../config.json");

module.exports = (post, preview) => {
  let text = post.text;
  if (text.length <= 1024) {
    _sendPreviewWithCaption(preview, text);
  } else {
    _sendPreviewLinkAfterText(preview, text);
  }
};

function _sendPreviewWithCaption(preview, text) {
  try {
    logMessage("Trying to send photo with caption");
    if (preview.type === "photo") {
      telegram
        .sendPhoto(-config.telegram.channelId, preview.url, {
          caption: text,
          parse_mode: "HTML"
        })
        .then(() => logMessage("Message successfully sent"));
    } else if (preview.type === "doc") {
      telegram
        .sendDocument(-config.telegram.channelId, preview.url, {
          caption: text,
          parse_mode: "HTML"
        })
        .then(() => logMessage(`Message successfully sent`));
    } else {
      throw "Unknown preview type";
    }
  } catch (error) {
    errorMessage(`Couldn't send photo with caption to telegram channel`);
    errorMessage(error);
  }
}

function _sendPreviewLinkAfterText(preview, text) {
  let previewLink = `<a href="${preview.url}">&#160;</a>`;
  text = text + "\n" + previewLink;
  try {
    logMessage("Trying to send preview link after text message");
    telegram
      .sendMessage(-config.telegram.channelId, text, {
        parse_mode: "HTML"
      })
      .then(() => logMessage(`Message successfully sent`));
  } catch (error) {
    errorMessage(`Couldn't send photo and text separate to telegram channel`);
    errorMessage(error);
  }
}