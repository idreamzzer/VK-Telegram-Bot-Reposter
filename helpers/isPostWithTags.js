const config = require("../config.json");

module.exports = post => {
  for (let tag of config.postTags) {
    let regexp = new RegExp(tag);
    if (regexp.test(post.text)) {
      return true;
    }
  }
  return false;
};
