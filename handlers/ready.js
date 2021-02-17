const { token } = require("../settiings/credentials.json");
const Discord = require("discord.js");
const ayarlar = require("../settiings/config.json");
const client = new Discord.Client();
module.exports = {
  ready: bot => {
    bot.login(ayarlar.token);
    bot.on("ready", () => {
      bot.user.setActivity("Only Code Gururla Sunar!", { type: "LISTENING" });
      bot.user.setStatus("online");
      console.log(
        `Botunuz Başarıyla Açıldı! by: Except`
      );
    });
  }
};
