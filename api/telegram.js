process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");
const Agent = require("socks5-https-client/lib/Agent");
const fs = require("fs");
const config = require("../config.json");
const { logMessage, errorMessage } = require("../helpers/logMessages");

module.exports = (() => {
  let withProxy = config.telegram.proxy ? config.telegram.proxy.enable : null;
  let telegram, botOptions, botOptionsWithProxy;
  botOptions = {
    polling: { params: { timeout: 10 }, interval: 2000 }
  };
  if (withProxy !== null) {
    botOptionsWithProxy = {
      polling: { params: { timeout: 10 }, interval: 2000 },
      request: {
        agentClass: Agent,
        agentOptions: {
          socksHost: config.telegram.proxy.socks5.host,
          socksPort: config.telegram.proxy.socks5.port,
          socksUsername: config.telegram.proxy.socks5.username,
          socksPassword: config.telegram.proxy.socks5.password
        }
      }
    };
  }

  try {
    telegram = new TelegramBot(
      config.telegram.botToken,
      withProxy ? botOptionsWithProxy : botOptions
    );

    setTimeout(
      () => telegram.isPolling() && logMessage("Telegram polling started"),
      3000
    );
  } catch (err) {
    errorMessage("Couldn't start telegram api");
    errorMessage(err);
    process.exit();
  }

  telegram.reconnectWithProxy = async () => {
    logMessage(`Trying to reconnect`);
    if (withProxy !== null) {
      config.telegram.proxy.enable = !config.telegram.proxy.enable;
      fs.writeFile("config.json", JSON.stringify(config, null, 2), err => {
        if (err) throw err;
        process.exit();
      });
    } else {
      process.exit();
    }
  };

  return telegram;
})();
