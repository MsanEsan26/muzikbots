const utils = require('../global/utils');
const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    let playing = new Discord.RichEmbed()
    .setDescription('Başarıyla Şarkı Durduruldu!')
    .setColor('RANDOM')
    .setTitle('⏳ Müzik Duraklatıldı!')
    .setThumbnail('https://media.tenor.com/images/25b594f010472086661dd1dc4d5f0e83/tenor.gif')
    .setFooter(bot.user.username)
    .setTimestamp();
    let notching = new Discord.RichEmbed()
    .setDescription('Başarıyla Müzik Kapatılı!') 
    .setColor('RANDOM')
    .setTitle('🔴 Müzik Kapatıldı!')
    .setThumbnail('https://media.tenor.com/images/f8c2b4778abc5672debed3477571b80d/tenor.gif')
    .setFooter(bot.user.username)
    .setTimestamp();
    if (queue && queue.playing) {
        queue.playing = false;
        queue.connection.dispatcher.pause();
        return message.channel.send(playing);
    }

    return [message.delete(), utils.timed_msg(notching, 5000)];
    
};

module.exports.help = {
    name: 'dur',
    aliases: ["durdur","stop","s"]
};