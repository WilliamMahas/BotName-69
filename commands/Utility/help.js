const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.json");
if (Prefix === null) Prefix = `!`;

module.exports = {
  name: "help",
  aliases: null,
  category: "utility",
  description: "Get All Commands Information!",
  usage: "Help | <Command Name>",
  accessableby: "everyone",
  run: async (client, message, args) => {

    //Start

    function ChangeLatter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    let cmdutil = client.commands.filter(command => command.category === "utility").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    let cmdfun = client.commands.filter(command => command.category === "fun").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");
    let cmdmod = client.commands.filter(command => command.category === "moderation").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ");

    let embedhelp = new MessageEmbed()
      .setColor(Color)
      .setTitle(`${client.user.username} Help!`)
      .setDescription(`Type The Following Command For A Specific Command Information -\n**${Prefix}Help <Command Name>**\n\n**🕹 Fun**\n${cmdfun}\n\n**⛏ Moderation**\n${cmdmod}\n\n**🧩 Utility**\n${cmdutil}\n\nUseful Links:\nBot Link - [Click Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\nThank You So Much <3`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    
    if (!args[0]) return message.channel.send(embedhelp);

    let command = client.commands.get(args[0].toLowerCase());
    
    if (!command) return message.channel.send(`No Command Found - ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
    .setTitle(`Command Information!`)
    .addField(`Name`, command.name.charAt(0).toUpperCase() + command.name.slice(1), true)
    .addField(`Category`, command.category || "No Category", true)
    .addField(`Aliases`, command.aliases ? command.aliases.join(", ") : "No Aliases", true)
    .addField(`Usage`, command.usage, true)
    .addField(`Description`, command.description)
    .setFooter(`Requested By ${message.author.username}`)
    .setTimestamp();
    
    return message.channel.send(Embeded);

    //End

  }
};