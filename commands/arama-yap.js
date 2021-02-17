const discord = require('discord.js');
const utils = require('../global/utils');
const config = require('../settiings/config.json');

module.exports.run = async (bot, message, args) => {

    let VC = message.member.voiceChannel;
    if (!VC) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, сначала в канал зайди голосовой!`), 5000)];

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let searchString = args.join(' ');
    if (!url || !searchString) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, Пожалуста впиши музыку или URL видео с музыкой!`), 5000)];

    let perms = VC.permissionsFor(message.client.user);
    if (!perms.has('CONNECT')) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, Я не имею права подключиться к каналу!`), 5000)];
    if (!perms.has('SPEAK')) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, Я не имею права говорить в канал!`), 5000)];

    if (url.match(pl)) {
        let playlist = await bot.youtube.getPlaylist(url);
        let videos = await playlist.getVideos();

        for (const vid of Object.values(videos)) {
            let video = await bot.youtube.getVideoByID(vid.id)
            await bot.handleVideo(video, message, VC, true)
        }

        return message.channel.send(`🎵 **${playlist.title}** Oynatma Listesine Eklendi!`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var videos = await bot.youtube.searchVideos(searchString, 10);
                let index = 0;

                let embed = new discord.RichEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(bot.user.avatarURL)
                    .setDescription(`**-=- Müzik Bulundu -=-**\n${videos.map(video => 
                        `**${++index} -** ${video.title}`).join('\n')}\n\n🎵 **1 ve 10 Arasındaki Sayıları Kullanarak Listeden Müziğinizi Seçin !**`);

                message.channel.send(embed);

                try {
                    var response = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    if (err) undefined
                    return message.channel.send(utils.cmd_fail('**⚠ 10 saniye geçti Komudu Yeniden Yaz!**'));
                }
                const videoIndex = parseInt(response.first().content);
                var video = await bot.youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return [message.delete(), utils.timed_msg(utils.cmd_fail(`**Girdiğiniz Müzik Adında Öyle Bir Müzik Yok !:${searchString}**`), 5000)];
            }
        }
        return bot.handleVideo(video, message, VC);
    }
};

module.exports.help = {
    name: 'arama',
    aliases: ['ara','search']
};