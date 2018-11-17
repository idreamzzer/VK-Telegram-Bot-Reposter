module.exports = {
  telegram: {
    botToken: "bot_token", // https://github.com/idreamzzer/VK-Telegram-Bot-Reposter#how-to-get-telegram-bot-token
    proxy: {
      enable: false,
      socks5: {
        host: "u0k12.tgproxy.me",
        port: "1080",
        username: "telegram",
        password: "telegram"
      }
    },
    channelId: "telegram_channel_id" // https://github.com/idreamzzer/VK-Telegram-Bot-Reposter#how-to-get-telegram-channel-id
  },
  vk: {
    groupId: "vk_group_id", // https://github.com/idreamzzer/VK-Telegram-Bot-Reposter#how-to-get-vk-group-id
    groupKey: "vk_group_key" // https://github.com/idreamzzer/VK-Telegram-Bot-Reposter#how-to-get-vk-group-key
  },
  postTags: ["&#13;", /\[.+\|.+\]/], // https://github.com/idreamzzer/VK-Telegram-Bot-Reposter#some-examples-post-tags-for-bot
  removeTags: true
};
