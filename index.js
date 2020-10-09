const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const auth = require('./auth.json')
client.login(auth.token)
const prefix = "jshelp"
const pages = fs.readdirSync("./pages")
var helppages = pages
for (i = 0; i < pages.length; i++) {
    pages[i] = pages[i].replace(".txt", "")
    helppages[i] = `[${i + 1}] ${pages[i].replace(".txt", "")}`
}
client.on('ready', () => {
    console.log("Bot is on!")
})
client.on('message', message => {
    function makeEmbed(title, input) {
        const embed = new Discord.MessageEmbed()
        embed.setColor("#fff700")
        embed.setAuthor("Help Bot", client.user.avatarURL())
        embed.setDescription(input.replace(/>>/g, "    "))
        if (title) embed.setTitle(title)
        message.channel.send({embed})
    }

    const splitMessage = message.content.startsWith(prefix + " ") ? message.content.split(/ (.+)/)[1].split(" ") : ""
    if(splitMessage[0] == "help") makeEmbed("Docs", helppages.join("\n"))
    else if (!isNaN(splitMessage[0])) message.channel.send("JSHELP Search is not ready yet")
    else {

    }
})