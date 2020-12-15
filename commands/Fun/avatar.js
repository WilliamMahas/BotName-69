const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp"],
  category: "fun",
  description: "Show Member Avatar!",
  usage: "Avatar | <Mention Member>",
  accessableby: "everyone",
  run: async (client, message, args) => {
    //Start

    let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let embed = new Discord.MessageEmbed()
      .setColor(Color)
      .addField(
        "Links",
        `[Png](${Member.user.displayAvatarURL({
          format: "png",
          dynamic: true
        })}) | [Jpg](${Member.user.displayAvatarURL({
          format: "jpg",
          dynamic: true
        })}) | [Webp](${Member.user.displayAvatarURL({
          format: "webp",
          dynamic: true
        })})`
      )
      .setImage(Member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
