const VkBot = require("node-vk-bot-api");
const config = require("../config");
const logger = require("../utils/logger");

module.exports = (() => {
  const bot = new VkBot(config.vk.groupKey, config.vk.groupId);
  bot.startPolling(() => {
    logger.debug("VK bot is polling");
  });
  return bot;
})();
