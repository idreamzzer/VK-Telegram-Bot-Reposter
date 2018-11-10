const {
  logMessage,
  errorMessage
} = require("./logMessages");

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
          logMessage(`Unhandled attachment doc type extention`);
          logMessage(doc);
          return "";
        }
      default:
        logMessage(`Unhandled attachment type`);
        logMessage(attach);
        return "";
    }
  }
};