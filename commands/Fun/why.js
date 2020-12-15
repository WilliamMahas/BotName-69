const { MessageEmbed } = require("discord.js");
const Random = require("srod-v2");

    module.exports = {
    name: "why",
    aliases: null,
    category: "fun",
    description: "sending random why",
    usage: "why",
    accessableby: "everyone",
    run: async (client, message, args) => {
	  let Why = await Random.GetWhy("BLUE");
	  message.channel.send(Why);
  }
};
