module.exports.config = {
  name: "callndh",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang update & fix by DuyVuong and D-jukie",
  description: "Thông báo lỗi của bot đến người hỗ trợ bot hoặc góp ý",
  commandCategory: "Dành cho người dùng",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users }) {
  try {
    var name = (await Users.getData(event.senderID)).name;
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.attachments.length != 0) {
      for (var p of event.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    };
    switch (handleReply.type) {
      case "reply": {
        var idad = global.config.NDH;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({
              body: "🔔 Phản hồi từ " + name + ":\n" + (event.body) || "không có nội dung trả lời", mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "callndh"
            }));
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: "🔔 Phản hồi từ " + name + ":\n" + (event.body) || "chỉ có tệp không có nội dung trả lời" + "\n----------------\nKèm theo tệp!", attachment: l, mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "callndh"
            }));
            for (var b of s) {
              fs.unlinkSync(b);
            }
          }
        }
        break;
      }
      case "callndh": {
        if (s.length == 0) {
          api.sendMessage({ body: `🔔 Phản hồi từ người hỗ trợ bot ${name} đến bạn:\n--------\n${(event.body) || "không có nội dung trả lời"}\n--------\n»💬Phản hồi tin nhắn này để tiếp tục gửi báo cáo về admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
        }
        else {
          api.sendMessage({ body: `🔔 Phản hồi từ người hỗ trợ bot ${name} đến bạn:\n--------\n${(event.body) || "chỉ có tệp không có nội dung trả lời"}\n--------\n»💬Phản hồi tin nhắn này để tiếp tục gửi báo cáo về admin\n--------\nTệp admin gửi đến bạn!`, attachment: l, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
        break;
      }
    }
  }
  catch (ex) {
    console.log(ex);
  }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
   let { senderID, messageID, threadID } = event;
  try {
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.messageReply) {
    if (event.messageReply.attachments.length != 0) {
      for (var p of event.messageReply.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    }
  }
    if (!args[0] && event.messageReply.attachments.length == 0)
      return api.sendMessage(
        "Bạn chưa nhập nội dung cần báo cáo",
        event.threadID,
        event.messageID
      );

    var name = (await Users.getData(event.senderID)).name;
    var idbox = event.threadID;

    var datathread = (await Threads.getData(event.threadID)).threadInfo;
    var namethread = datathread.threadName;

    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    var soad = global.config.NDH.length;
    api.sendMessage(
      "DONE!\nĐã gửi nội dung tới " + soad + " người hỗ trợ bot...",
      event.threadID,
      () => {
        var idad = global.config.NDH;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({ body: `=======CALLNDH=======\n\n⏰ TIME: ${gio}\n👤 Name: ${name}\n❗ UID: ${senderID}\n👻 Nhóm: ${namethread}\n😺 ThreadID: ${event.threadID}\n\n✅ Nhắn :  ${args.join(" ")}`, mentions: [{ id: event.senderID, tag: name }] },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "calladmin"
              })
            );
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: `=======CALLNDH=======\n\n⏰ TIME: ${gio}\n👤 Name: ${name}\n❗ UID: ${senderID}\n👻 Nhóm: ${namethread}\n😺 ThreadID: ${event.threadID}\n\n✅ Nhắn :  ${args.join(" ")}`, attachment: l, mentions: [{ id: event.senderID, tag: name }]
            },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "callndh"
              })
            );
          }
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
      }
      , event.messageID);
  }
  catch (ex) {
    console.log(ex);
  }
};