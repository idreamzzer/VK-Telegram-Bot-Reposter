const isPostWithTags = require("./isPostWithTags");
const getPreviewFromPost = require("./getPreviewFromPost");
const sendPost = require("./sendPost");
const sendPostWithPreview = require("./sendPostWithPreview");
const removeTagsFromPostText = require("./removeTagsFromPostText");

module.exports = {
  isPostWithTags,
  getPreviewFromPost,
  sendPost,
  sendPostWithPreview,
  removeTagsFromPostText
};
