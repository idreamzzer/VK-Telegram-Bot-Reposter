const config = require("../config");

module.exports = text => {
  for (let tag of config.postTags) {
    text = text.replace(tag, "");
  }
  return text;
};
