module.exports.config = {
	name:"hentaigif",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "HTHB-api mod by Kaneki",
	description: "Random แบฃnh ny Quyแปn theo api",
	commandCategory: "nsfw",
	cooldowns: 3
};
module.exports.run = async ({ api, event }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://tuandz.herokuapp.com/images/hentai').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
            body: `๐๐ข๐ฬฃฬ๐ง ๐ซ๐จฬ ๐๐ฬ๐ข ๐๐ฬ๐ง ๐ฆ๐ฬฃฬ๐ญ ๐๐ฬ๐ฆ ๐๐ฎฬฃ๐ ๐๐ฎฬ๐ ๐๐ฆ ๐ข๐ฎ ๐ค๐ขฬ๐`,
						attachment: fs.createReadStream(__dirname + `/cache/nyad.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/nyad.${ext}`), event.messageID);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/nyad.${ext}`)).on("close", callback);
			})
}