const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
    name: "serverinfo",
    category: "info",
    description: "Show Server Information!",
    usage: "Serverinfo",
    run: async (client, message, args) => {

        //Start

        let g = message.guild;
        let Human = g.members.cache.filter(m => !m.user.bot).size || "0", Bots = g.members.cache.filter(m => m.user.bot).size || "0";
        let Online = g.members.cache.filter(m => m.user.presence.status === "online").size || "0", Offline = g.members.cache.filter(m => m.user.presence.status === "offline").size || "0", Dnd = g.members.cache.filter(m => m.user.presence.status === "dnd").size || "0", Idle = g.members.cache.filter(m => m.user.presence.status === "idle").size || "0";
        let Owner = g.ownerID, Roles = g.roles.cache.size - 1 === 0 ? "None" : g.roles.cache.size - 1;
        let Channels = g.channels.cache.filter(c => c.type !== "category").size || "0", Emotes = g.emojis.cache.size;
        let Created = g.createdAt.toDateString(), Mem = g.memberCount;

        let Embed = new MessageEmbed()
        .setColor(Color)
        .setThumbnail(g.iconURL({ dynamic: true }))
        .setTitle(`Server Information!`)
        .addField(`Full Name`, g.name, true)
        .addField(`ID`, g.id, true)
        .addField(`Owner`, `<@${Owner}>`, true)
        .addField(`Roles`, Roles + " (Use ServerInfo Roles)", true)
        .addField(`Channels`, Channels + " (Use Serverinfo Channels)", true)
        .addField(`Emojis`, Emotes + " (Use Serverinfo Emojis)", true)
        .addField(`Members [${Mem}]`, `Onlines: ${Online}\nDnd: ${Dnd}\nIdle: ${Idle}\nOffline: ${Offline}`, true)
        .addField(`Humans`, Human, true)
        .addField(`Bots`, Bots, true)
        .addField(`Server Created At`, Created)
        .setTimestamp();

        if (args[0]) {
          args[0] = args[0].toLowerCase();

          if (args[0] === "roles") {
            if (!(message.guild.roles.cache.size - 1)) return message.channel.send("No Role!");
                  let Roles = message.guild.roles.cache.array().map(r => `${r.name} - ${r.id} - ${r.members.size} Members`).join("\n");

                  return message.channel.send("```" + Roles + "```", { split: { char: '\n' } })
          } else if (args[0] === "channels") {
                let Channels = message.guild.channels.cache.filter(ch => ch.type !== "category").array().map(ch => `${ch.name} - ${ch.id}`).join("\n");

                return message.channel.send("```" + Channels + "```", { split: { char: "\n" }});
          } else if (args[0] === "emojis") {
               let Emojis = message.guild.emojis.cache.array().map(emo => `${emo.name} - ${emo.id} - ${emo.animated ? "Animated" : "Non-Animated"}`).join("\n");

               return message.channel.send("```" + Emojis + "```", { split: { char: "\n" }});
          } else {
              return message.channel.send(Embed);
          }
        } else {
          return message.channel.send(Embed);
        };

        //End

    }
};