const vk = require("./api/vk");
const errorHandlers = require("./errorHandlers");
const logger = require("./utils/logger");
const config = require("./config");
const {
  isPostWithTags,
  getPreviewFromPost,
  sendPost,
  sendPostWithPreview,
  removeTagsFromPostText
} = require("./helpers");

module.exports = () => {
  vk.event("wall_post_new", ctx => {
    const post = ctx.message;
    if (isPostWithTags(post)) {
      logger.info("New post");
      logger.debug(post.text);

      if (config.removeTags) {
        post.text = removeTagsFromPostText(post.text);
      }

      const preview = getPreviewFromPost(post);
      if (preview && preview.type && preview.url) {
        sendPostWithPreview(post, preview);
      } else {
        sendPost(post);
      }
    }
  });

  errorHandlers();
};
