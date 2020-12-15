const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const db = require("quick.db");

   module.exports = {
    name: "command",
    aliases: null,
    category: "moderation",
    description: "Turn on or off a command",
    usage: "command",
    accessableby: "administrator",
    run: async (client, message, args) => {

        //Start

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You Don't Have Permission To Use This Command - Administrator`);

        const Name = args[0];

        if (!Name) return message.channel.send(`Please Give Command Name!`);

        const cmd = client.commands.get(Name.toLowerCase());

        if (!cmd) return message.channel.send(`Command Not Found - 404`);

        const Type = args[1];

        if (!Type) return message.channel.send(`Please Give Command Type - On , Off`);

        let array = ["on", "off"];

        if (!array.find(a => a === Type.toLowerCase())) return message.channel.send(`Invalid Type - On , Off`);

        const Current = await db.fetch(`CommandOn_${message.guild.id}_${Name.toLowerCase()}`);
        
        if (Current && Current.toLowerCase() === Type.toLowerCase()) return message.channel.send(`Its Already ${Current}!`);

        if (Current === null && Type.toLowerCase() === "on") return message.channel.send(`Its Already On!`);

        let Upper = Type.charAt(0).toUpperCase() + Type.slice(1);

        await db.set(`CommandOn_${message.guild.id}_${Name.toLowerCase()}`, Type.toLowerCase() === "on" ? null : Upper);

        let Embed = new MessageEmbed()
        .setColor(Color)
        .setTitle(`Success`)
        .setDescription(`Command Has Been ${Upper === "On" ? "Enabled" : "Disabled"} - <@${message.author.id}>`)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

        return message.channel.send(Embed);

        //End //EMIRHAN IMER  

    }
};