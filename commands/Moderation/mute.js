const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
      //Copy and use this Handler ok
      
    module.exports = {
    name: "mute",
    aliases: null,
    category: "moderation",
    description: "Mute a person",
    usage: "mute <@member>",
    accessableby: "Moderator",
    run: async (client, message, args) => {

    try {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**You don't have pmerissions to mute someone - [MANAGE_GUILD]**");

        if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("**I don't have pmerissions to mute someone - [MANAGE_GUILD]**")
        if (!args[0]) return message.channel.send("**Please enter a user to mute!*");

        var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send("**Please enter a valid user to mute!*");

        if (mutee === message.member) return message.channel.send("**You Cannot Mute Yourself!**")
        if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('*Connot mute this user!*')

        let reason = args.slice(1).join(" ");
        if (mutee.user.bot) return message.channel.send("*Connot mute BOTS!*");
        const userRoles = mutee.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r.id)

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }

        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "muted",
                        color: "#514f48",
                        permissions: []
                    }
                })
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false,
                        CONNECT: false,
                    })
                })
            } catch (e) {
                console.log(e);
            }
        };

        if (mutee.roles.cache.has(muterole.id)) return message.channel.send("**The user is already muted!*")

        db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
      try {
        mutee.roles.set([muterole.id]).then(() => {
            mutee.send(`You Have Been Muted In ${message.guild.name} - **${reason || "No Reason"}**`).catch(() => null)
        })
        } catch {
             mutee.roles.set([muterole.id])                               
        }
            if (reason) {
            const sembed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${mutee.user.username}** was successfully muted for \nReason: **${reason}**`)
            message.channel.send(sembed);
            } else {
                const sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${mutee.user.username}** was successfully muted`)
            message.channel.send(sembed2);
            }
        } catch {
            return;
        }
    }
}