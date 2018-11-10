const {
  VKApi,
  ConsoleLogger,
  BotsLongPollUpdatesProvider
} = require("node-vk-sdk");
const config = require("../config.json");
const {
  logMessage,
  errorMessage
} = require("../helpers/logMessages");

module.exports = (() => {
  const serviceApi = new VKApi({
    token: config.vk.appServiceKey,
    logger: new ConsoleLogger()
  });

  const groupApi = new VKApi({
    token: config.vk.groupKey,
    logger: new ConsoleLogger()
  });

  let botLongPoll;
  try {
    botLongPoll = new BotsLongPollUpdatesProvider(groupApi, config.vk.groupId);
    setTimeout(() => botLongPoll.ts && logMessage("VK polling started"), 3000);
  } catch (err) {
    errorMessage(`Couldn't start vk bots longpoll`);
    errorMessage(err);
  }

  return {
    serviceApi,
    botLongPoll
  };
})();