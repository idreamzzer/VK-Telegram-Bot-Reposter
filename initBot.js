const vk = require("./api/vk");
const errorHandlers = require("./errorHandlers");
const logger = require("./utils/logger");
const {
  isPostWithTags,
  getPreviewFromPost,
  sendPost,
  sendPostWithPreview
} = require("./helpers");

module.exports = () => {
  vk.event("wall_post_new", ctx => {
    const post = ctx.message;
    if (isPostWithTags(post)) {
      logger.debug("New post");
      logger.debug(post.text);
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
