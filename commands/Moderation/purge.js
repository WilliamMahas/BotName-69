const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

    module.exports = {
    name: "purge",
    aliases: null,
    category: "moderation",
    description: "Purge messages also known ass mass delete messages",
    usage: "purge",
    accessableby: "moderator",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have sufficient permissions!- [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**Please supply a valid amount to delete messages!**');

        if (args[0] > 100)
            return message.channel.send("**Please supply a number less than 100!**");

        if (args[0] < 1)
            return message.channel.send("**Please supply a number more than 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`)
            .then(msg => msg.delete({ timeout: 2000 })))
            .catch(() => null)
			let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Purge")
                .addField("Messages", `${args[0]}`)
                .addField("Channel ID", `${message.channel.id}`)
                .addField("Used by:", message.author.username)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
    }
}