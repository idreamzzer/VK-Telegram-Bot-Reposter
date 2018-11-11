const logger = require("../utils/logger");

module.exports = post => {
  if (!post.attachments || !post.attachments.length) return "";
  for (let attach of post.attachments) {
    switch (attach.type) {
      case "photo":
        const photo = attach.photo;
        // get original photo size url
        const url = photo.sizes.find(
          size => size.width === Math.max(...photo.sizes.map(s => s.width), 0)
        ).url;
        return {
          type: attach.type,
          url
        };
      case "doc":
        const doc = attach.doc;
        if (doc.ext === "gif") {
          return {
            type: attach.type,
            url: doc.url
          };
        } else {
          logger.warn(`Unhandled attachment doc type extention`);
          logger.warn(doc);
          return "";
        }
      default:
        logger.warn(`Unhandled attachment type`);
        logger.warn(attach);
        return "";
    }
  }
};
