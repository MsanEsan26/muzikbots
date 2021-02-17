const discord = require("discord.js");
const { prefix } = require("../settiings/config.json");

module.exports.run = async (bot, message, args) => {
  let embed = new discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(bot.user.avatarURL)
    .setTitle(`${bot.user.username} Yardım Listesi`)
    .addField(`${prefix}play <müzik-ismi / url>`, "Müzik Çalar!")
    .addField(`${prefix}search <müzik>`, "İsteğine Göre 10 Müziği Arar!")
    .addField(
      `${prefix}geç`,
      "Sıradaki Müziğe Geçer! (Hakkınız Yoksa 3 Oy Gerekir)"
    )
    .addField(`${prefix}ses`, "Botun Ses Seviyesini Ayarlar!")
    .addField(`${prefix}stop`, "Bot Müziği Durdurur!")
    .addField(`${prefix}devam-et`, "Durdurulan Şarkıya Devam Eder!")
    .addField(`${prefix}leave`, "Bot Kanaldan Ayrılır!")
    .addField(`${prefix}list`, "Oynatma Listesini Gösterir!")

  message.channel.send(embed);
};

module.exports.help = {
  name: "yardım",
  aliases: ["help"]
};
