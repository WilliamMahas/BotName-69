const { MessageEmbed } = require("discord.js")

    module.exports = {
    name: "unlock",
    aliases: null,
    category: "moderation",
    description: "Unlock  a channel after lockdown",
    usage: "unlock",
    accessableby: "administrator",
    run: async (client, message, args) => {
      
      

    if(!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(
        new MessageEmbed()
        .setDescription("You don't have enough permissions to use this command.")
    )
    if(!message.mentions.channels.first()) return message.channel.send(
        new MessageEmbed()
        .setDescription("You didn't specify a channel to unlock.")
    )

   await message.mentions.channels.forEach(async channel => {

        if(channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === true) return message.channel.send("That channel is already unlocked.");
        try {
           await channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        });
        message.channel.send(`<#${channel.id}> has been successfully unlocked.`)
        } catch(err) {
            console.log(err);
        }
      }
    )
  }
};