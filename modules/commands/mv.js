module.exports.config = {
  name: "mv",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JRT",
  description: "xem แบฃnh hiแปn cรณ trรชn bot",
  commandCategory: "nsfw",
  usages: "mv",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
}

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies,getText}) => {
   
   const axios = require('axios');
    const request = require('request');
    const fs = require('fs-extra');

     if (args.length == 0) return api.sendMessage(`๐ ๐๐๐ง๐ก ๐๐ฬ๐๐ก ๐๐ข๐๐๐จ ๐\n\n๐. ๐๐ฏ ๐๐ฬ๐ข โค๏ธ\n๐. ๐๐ฏ ๐ฌ๐๐ฑ ๐\n๐. ๐๐ฏ ๐ญ๐ข๐ค๐ญ๐จ๐ค ๐\n\n๐๐ฎฬ๐ง๐  /๐ฆ๐ฏ  (๐ฏ๐ข๐๐๐จ ๐๐ฬฃ๐ง ๐๐ฬฬ๐ง ๐ฑ๐๐ฆ)\n
`, event.threadID, event.messageID);

     if (args[0] == "gรกi") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://tuandz.herokuapp.com/images/videogaixinh').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `โก๏ธVideo gรกi xinh nรจ <3\n-1000 ฤรด`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("Bแบกn cแบงn 1000 ฤรด",event.threadID,event.messageID);
  }
  if (args[0] == "tiktok") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://tuandz.herokuapp.com/images/videogaixinh').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `โก๏ธVideo tiktok nรจ <3\n-1000 ฤรด`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("Bแบกn cแบงn 1000 ฤรด",event.threadID,event.messageID);
  }
    if (args[0] == "sex") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://tuandz.herokuapp.com/images/videosex').then(res => {
  var video = res.data.url;
  let callback = function () {
          api.sendMessage({
            body: `โก๏ธVideo sex nรจ <3\n-1000 ฤรด`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("Bแบกn cแบงn 1000 ฤรด",event.threadID,event.messageID);
  }
}