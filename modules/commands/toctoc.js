module.exports.config = {
	name:"toctoc",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Binee",
	description: "Random video tiktok gรกi",
	commandCategory: "Tiแปn รch",
	cooldowns: 3
};
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://tuandz.herokuapp.com/images/videogaixinh').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
            body: `๐ฃ๐ต๐ฎฬ๐ ๐๐ฬ๐ฐ ๐๐บ ๐ง๐ฟ๐ฎฬ๐บ ๐ก๐ด๐ฎฬ๐ป ๐ฃ๐ต๐ผฬ ๐๐ผฬ ๐ค`,
						attachment: fs.createReadStream(__dirname + `/cache/top.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/top.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/top.${ext}`)).on("close", callback);
			})
}