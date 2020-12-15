const Discord = require("discord.js")
module.exports = {
    name: "restart",
    category: "owner",
    run: async (client, message, args) => {

// start

const gg = "gg/devs"
        if (message.author.id !== '754385212590522448') {
            return message.channel.send(`**❌ | You cannot use this command!**`)
        }
const embed = new Discord.MessageEmbed()
.setTitle("Confirmation!")
.setDescription("Do you want to restart the bot?")
.setFooter("Simply please react above")
.setColor("RANDOM")
        const msg = await message.channel.send(embed)
const cancel = new Discord.MessageEmbed()
.setTitle("Cancelled!")
.setDescription("Command Cancelled.")
.setFooter(`Restart command by Discord.${gg}`)
.setColor("#FF0000")

const yes = new Discord.MessageEmbed()
.setTitle("Restarting Bot")
.setDescription("The Bot is now restarting and should be ready in 1 - 15 seconds")
.setFooter(`Restarting... | discord.${gg}`)
.setColor("GREEN")
await msg.react('✅')
            await msg.react('❌')
const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                               msg.edit(yes).then(() => process.exit());
                                break;
                            case '❌':
                                msg.edit(cancel)
                                break;
                        }
                    })
})
console.log(`Discord.${gg}`)
    }
}