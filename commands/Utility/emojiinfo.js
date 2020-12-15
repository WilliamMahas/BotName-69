const Discord = require("discord.js");
//By Legendary Emoji :D

    module.exports = {
    name: "emojiinfo",
    aliases: null,
    category: "utility",
    description: "Information of an emoji",
    usage: "einfo",
    accessableby: "everyone",
    run: async (client, message, args) => {

        if (!args[0] || !args[0].startsWith("<") || !args[0].endsWith(">") || !args[0].includes(":")) return message.channel.send(`Please Give A Valid Custom Emoji!`);

        let Thinger = args[0].split(":");

        let Animated;
        if (Thinger[0] === "<a") {
          Animated = true;
        } else {
          Animated = false;
        };

        const Name = Thinger[1];
        const ID = Thinger[2].slice(0, -1);
        const Link = `https://cdn.discordapp.com/emojis/${ID}.${Animated ? "gif" : "png"}?v=1`;

        return message.channel.send(`Name: ${Name}\nID: ${ID}\nAnimated: ${Animated ? "Yes" : "No"}\nLink: ${Link}`);

        //End

    }
};