const db = require('quick.db');

module.exports = {
    name: "setprefix",
    aliases: null,
    category: "moderation",
    description: "Change the Bot prefix to a new one",
    usage: "setprefix",
    accessableby: "administrator",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**You do not have sufficient Permissions! - [ADMINISTRATOR]**")

        if (!args[0]) {
          let b = await db.fetch(`prefix_${message.guild.id}`);
          if (b) {
        return message.channel.send(
          `**Prefix Of This Server is \`${b}\`**`
        );
      } else return message.channel.send("**Please enter a prefix to set**");
    } 
      
        try {

            let a = args.join(' ');
            let b = await db.fetch(`prefix_${message.guild.id}`)

            if (a === b) {
                return message.channel.send('**This is already the prefix**')
            } else {
                db.set(`prefix_${message.guild.id}`, a.toLowerCase())

                return message.channel.send(`**Successfuly Set Server Prefix To \`${a}\`**`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}