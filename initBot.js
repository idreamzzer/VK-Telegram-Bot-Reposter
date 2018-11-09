module.exports = () => {
  const vk = require("./api/vk");
  const telegram = require("./api/telegram");
  const errorHandlers = require("./errorHandlers");
  const { logMessage, errorMessage } = require("./helpers/logMessages");
  const getPost = require("./helpers/getPost");
  const getPreviewFromPost = require("./helpers/getPreviewFromPost");
  const sendPostWithPreview = require("./helpers/sendPostWithPreview");
  const sendPost = require("./helpers/sendPost");

  try {
    vk.botLongPoll.getUpdates(updates => {
      const post = getPost(updates);
      if (post) {
        logMessage(`New post`);
        logMessage(post.text);
        const preview = getPreviewFromPost(post);
        if (preview && preview.type && preview.url) {
          sendPostWithPreview(post, preview);
        } else {
          sendPost(post);
        }
      }
    });
  } catch (err) {
    errorMessage(`VK API: error on vk.listenGroupForPosts`);
    errorMessage(err);
  }

  errorHandlers();
};
