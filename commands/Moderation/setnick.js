const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

    module.exports = {
    name: "setnick",
    aliases: null,
    category: "moderation",
    description: "Set a server nickname on someone",
    usage: "setnick, nick",
    accessableby: "moderator",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**You don't have permissions to change nickname! - [MANAGE_GUILD]**");

        if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send("**I don't have permissions to change nickname! - [CHANGE_NICKNAME]**");
      
        if (!args[0]) return message.channel.send("**Please enter a user!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Please enter a username!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**I connot change or set a nickname of this user**')

        if (!args[1]) return message.channel.send("**Please enter a nickname!**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Changed Nickname of ${member.displayName} to ${nick}**`)
            .setAuthor(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Missing Permissions - [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "setnick")
            .addField("**Nick Changed Of**", member.user.username)
            .addField("**Nick Changed By**", message.author.username)
            .addField("**Nick Changed To**", args[1])
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}