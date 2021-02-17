const utils = require("../global/utils");
const config = require("../settiings/config.json");

module.exports.run = async (bot, message, args) => {
  let VC = message.member.voiceChannel;
  if (!VC)
    return [
      message.delete(),
      utils.timed_msg(
        utils.cmd_fail(`**${message.author}, Önce Bir Kanala Giriniz !**`),
        5000
      )
    ];

  let url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
  let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/;

  let searchString = args.join(" ");
  if (!url || !searchString)
    return [
      message.delete(),
      utils.timed_msg(
        utils.cmd_fail(
          `**${message.author}, Lütfen Müziğin Adını veya URL sini Giriniz!**`
        ),
        5000
      )
    ];

  let perms = VC.permissionsFor(message.client.user);
  if (!perms.has("CONNECT"))
    return [
      message.delete(),
      utils.timed_msg(
        utils.cmd_fail(`**${message.author}, Kanala bağlanma hakkım yok!**`),
        5000
      )
    ];
  if (!perms.has("SPEAK"))
    return [
      message.delete(),
      utils.timed_msg(
        utils.cmd_fail(`**${message.author}, 
Kanalda konuşma hakkım yok!**`),
        5000
      )
    ];

  if (url.match(pl)) {
    let playlist = await bot.youtube.getPlaylist(url);
    let videos = await playlist.getVideos();

    for (const vid of Object.values(videos)) {
      let video = await bot.youtube.getVideoByID(vid.id);
      await bot.handleVideo(video, message, VC, true);
    }

    return message.channel.send(
      `**🎵 ${playlist.title} Oynatma Listesine Eklendi**`
    );
  } else {
    try {
      var video = await bot.youtube.getVideo(url);
    } catch (err) {
      if (err) undefined;
      try {
        var vid = await bot.youtube.searchVideos(searchString, 1);
        var video = await bot.youtube.getVideoByID(vid[0].id);
      } catch (err) {
        console.error(err);
        return [
          message.delete(),
          utils.timed_msg(
            utils.cmd_fail(
              `**${message.author}, Girdiğiniz Müzik Adında Öyle Bir Müzik Yok!  {searchString}**`
            ), 
            5000
          )
        ];
      }
    }
    return bot.handleVideo(video, message, VC);
  }
};

module.exports.help = {
  name: "oynat",
  aliases: ["play", "p"]
};
