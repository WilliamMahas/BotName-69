const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
    name: "unban",
    aliases: null,
    category: "moderation",
    description: "Unban A Member!",
    usage: "Unban <Member ID>",
    accessableby: "everyone",
    run: async (client, message, args) => {

        //Start

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You don't have the right permissions to use this command`);

        if (!args[0]) return message.channel.send(`Please give me a valid User ID that you want to unban`);

        if (isNaN(args[0])) return message.channel.send(`Please Give Me Valid ID!`);

        if (args[0] === message.author.id) return message.channel.send(`You are already unbanned!`);

        if (args[0] === message.guild.owner.user.id) return message.channel.send(`Server Owner Is Already Unban!`);

        if (args[0] === client.user.id) return message.channel.send(`I am already unbanned!`);

        let FetchBan = await message.guild.fetchBans();

        let Member;
        Member = FetchBan.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || FetchBan.get(args[0]) || FetchBan.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());

        if (!Member) return message.channel.send("**Please give a vlid Member ID or Member to unban!*");

        let Reason = args.slice(1).join(" ") || "No reason provided!"

        try {
            message.guild.members.unban(Member.user.id, Reason)
        } catch(error) {
            return message.channel.send(`**I can't unban that User, Please check if he is banned & double check the permissions*`)
        }

        let embed = new MessageEmbed()
        .setColor(Color)
        .setTitle(`Member Unbanned!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}}`)
        .addField(`Unbanned Member`, `${Member.user.tag} (${Member.user.id}`)
        .addField(`Reason`, `${Reason || "No reason provided!"}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();

        return message.channel.send(embed);

        //End

    }
};