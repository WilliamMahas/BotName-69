const Color = `GREY`; //Hex , Name (In CAPS) , Etc
const Discord = require("discord.js");

module.exports = {
  name: "say",
  aliases: ["s"],
  category: "Fun",
  description: "Say Something :D",
  usage: "Say <Content>",
  run: async (client, message, args) => {
    
    const Content = args.join(" ");

    if (!Content) return message.channel.send("Please give me something to say!");

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setDescription(Content)

    return message.channel.send(Embed);
  }
};