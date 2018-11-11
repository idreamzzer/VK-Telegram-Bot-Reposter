process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");
const Agent = require("socks5-https-client/lib/Agent");
const config = require("../config.json");
const logger = require("../utils/logger");

module.exports = (() => {
  let withProxy = config.telegram.proxy && config.telegram.proxy.enable;
  let telegram;
  let botOptions = {};
  if (withProxy) {
    botOptions.request = {
      agentClass: Agent,
      agentOptions: {
        socksHost: config.telegram.proxy.socks5.host,
        socksPort: config.telegram.proxy.socks5.port,
        socksUsername: config.telegram.proxy.socks5.username,
        socksPassword: config.telegram.proxy.socks5.password
      }
    };
  }

  try {
    telegram = new TelegramBot(config.telegram.botToken, botOptions);
  } catch (err) {
    logger.error("Couldn't start telegram api");
    logger.error(err);
    process.exit();
  }

  return telegram;
})();
