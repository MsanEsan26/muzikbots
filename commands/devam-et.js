const utils = require('../global/utils');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    
    if (queue && !queue.playing) {
        queue.playing = true;
        queue.connection.dispatcher.resume();
        return message.channel.send(`**🎵 Zaten Müzik Çalmaya Devam Ediyor!**`);
    }

    return [message.delete(), utils.timed_msg('**🎶 Müzik Devam Etmeye Başladü!**', 5000)];

};

module.exports.help = {
    name: 'devamet',
    aliases: ['devam-et','go-ahead','goahead']
};