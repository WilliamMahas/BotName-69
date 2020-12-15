const { MessageEmbed } = require("discord.js")

    module.exports = {
    name: "lock",
    aliases: null,
    category: "moderation",
    description: "Lock a channel",
    usage: "lock",
    accessableby: "administrator",
    run: async (client, message, args) => {
      

          if(!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(
        new MessageEmbed()
        .setDescription("You don't have enough permissions to use this command.")
    )
    if(!message.mentions.channels.first()) return message.channel.send(
        new MessageEmbed()
        .setDescription("You didn't specify a channel to lock.")
    )

   await message.mentions.channels.forEach(async channel => {

        if(channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false) return message.channel.send("That channel is already locked.");
        try {
         await channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });
        message.channel.send(`<#${channel.id}> has been successfully locked.`)
        } catch(err) {
            console.log(err);
        }
      }
    )
  }
};