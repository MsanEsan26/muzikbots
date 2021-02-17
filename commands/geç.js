const utils = require('../global/utils');
const config = require('../settiings/config.json');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    let votes = bot.votes.get(message.guild.id);
    if (!message.member.voiceChannel) return [message.delete(), utils.timed_msg(utils.cmd_fail(`**${message.author}, Komutu Kullanmak İçin Ses Kanalına Giriniz!!**`), 5000)];
    if (!queue) return [message.delete(), utils.timed_msg('⚠ Hiçbir Müzik Çalmıyor!.', 5000)];

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        if (votes.voters.includes(message.author.id)) return [message.delete(), utils.timed_msg(utils.cmd_fail(`**⚠ ${message.author}, Oyu nu çok önce verdin! ${votes.votes}/3 oy**`), 5000)];

        votes.votes++
        votes.voters.push(message.author.id);
        message.channel.send(`**🎵 ${message.author}, Geçiş İçin Oy Verdiniz! ${votes.votes}/3 oy**`);

        if (votes.votes > 3) return queue.connection.dispatcher.end();
    } else return queue.connection.dispatcher.end();
    
};

module.exports.help = {
    name: 'atla',
    aliases: ['geç','jump','late']
};