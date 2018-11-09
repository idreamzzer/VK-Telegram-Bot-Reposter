const config = require("../config.json");

module.exports = updates => {
  if (Array.isArray(updates) && updates.length) {
    const post = updates[0].object;
    for (let tag of config.postTags) {
      let regexp = new RegExp(tag);
      if (regexp.test(post.text)) {
        return post;
      }
    }
  }
  return null;
};
