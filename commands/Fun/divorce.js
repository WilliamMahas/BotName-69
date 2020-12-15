const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

    module.exports = {
    name: "divorce",
    aliases: null,
    category: "fun",
    description: "Make a divorce of the person you are married with!",
    usage: "divorce",
    accessableby: "everyone",
    run: async (client, message, args) => {

        //Start

        let GetStatus = await db.fetch(`MarryStatus_${message.author.id}`);
        if (GetStatus === null) return message.channel.send(`You Are Single!`);

        await db.set(`MarryStatus_${GetStatus}`, null);
        await db.set(`MarryStatus_${message.author.id}`, null);

        let Embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`RIP`)
        .setDescription(`You Are Now Single!`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
};