### VK Telegram Bot Reposter

Custom reposting bot from VK group to Telegram channel

### Requirements

Latest Node.js,
Installed npm package "pm2"

### Installation

Rename `example_config.json` to `config.json` and paste your data in there

```sh
npm install

$ npm install -g pm2

pm2 start index.js

pm2 save

pm2 startup

```

### Tips

##### How to get telegram bot token:

Find @BotFather in telegram and type /newbot. Follow instructions he given.

##### How to get telegram channel id:

Paste your bot token and channel @name in https://api.telegram.org/bot[bot_token]/getChat?chat_id=@[channel_name]

##### How to get vk group id:

Open any photo in group and find "...photo-[group id]-123123123..."

##### How to get vk group key:

Go to group Manage/API Usage/Access Tokens. Create token with: community management and wall. Also go to Long Poll API and Enable it with latest version and enable Event type "Wall posts: New".

##### Some examples post tags for bot:

"\&#13;", "#test", "#test@test", /\\[.+\\|.+\\]/ - the last one is for checking "@group (My Awesome Group)". From vk api we're getting "[club123123|My Awesome Group]"

### TODO

- Handle long messages (4096+ length)
- Find better way to handle telegram polling errors (right now its just reloads app with proxy and without proxy)
- Add web ui with authorization to configure bot's settings in `config.json`
- Add posting from telegram channel to vk group (fully synchronized in both ways)
- Testing
- If no tags in config then get all posts

### Few words about app logic

On app start vk bot listens for getUpdates.
On updates app helpers look for new wall post.
If there new wall post then look for post preview image (jpg, jpeg, ...etc..., gif) from post's attachments.
If no preview image then sendMessage to telegram channel.
If found preview image then decide which method to use to send message to telegram: sendMessage or sendPhoto.
If post's text length less than 1024 - use sendPhoto and paste text as caption for photo.
If post's text length more than 1024 - use sendMessage and paste after text preview image as empty (not exactly) link `<a href="${preview image url}">&#160;</a>`.
