module.exports.config = {
	name: "boy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Xem แบฃnh trai",
	commandCategory: "Random-IMG",
	usages: "boy",
	cooldowns: 2
};

module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://apituandz1407.herokuapp.com/api/trai.php').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
						body: `๐๐ง๐ก ๐ญ๐ซ๐๐ข ๐ง๐ฬ ๐ฆ๐ฬฬ๐ฒ ๐๐จ๐ง ๐ช๐ฎ๐ฒฬ ๐ฆ๐ฬ ๐ญ๐ซ๐๐ข ๐๐ก๐ฎฬ๐ ๐ค`,
						attachment: fs.createReadStream(__dirname + `/cache/boy.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boy.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/boy.${ext}`)).on("close", callback);
			})
}