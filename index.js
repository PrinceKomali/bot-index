const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const auth = require('./auth.json')
client.login(auth.token)
const prefix = "jshelp"
const pages = fs.readdirSync("./pages")
var helppages = fs.readdirSync("./pages")
for (i = 0; i < pages.length; i++) {
    pages[i] = pages[i].replace(".txt", "")
    helppages[i] = helppages[i].replace(/[0-9]/, "").replace(".txt", "").replace(/_/g, "")
}
client.on('ready', () => {
    console.log("Bot is on!")
})
client.on('message', message => {
    //FUNCTIONS
    function makeEmbed(title, input) {
        const embed = new Discord.MessageEmbed()
        embed.setColor("#fff700")
        embed.setAuthor("Help Bot", client.user.avatarURL())
        embed.setDescription(input.replace(/>>/g, "    "))
        if (title) embed.setTitle(title)
        message.channel.send({embed})
    }
    function extractPageData(pagenum) {
        const thisPage = fs.readdirSync("./pages")[pagenum - 1]
        try {
            console.log(fs.readFileSync(__dirname + "\\pages\\" + thisPage, "utf8"))
        }
        catch (err) { throw err }
    }
    //TRIGGERS
    const splitMessage = message.content.startsWith(prefix + " ") ? message.content.split(/ (.+)/)[1].split(" ") : ""
    if (splitMessage != "") {
        if (splitMessage[0] == "help") {
            for (i = 0; i < helppages.length; i++) {
                helppages[i] = "**[" + (i + 1) + "]** " + helppages[i]
            }
            makeEmbed("Docs (do `jshelp #`)", helppages.join("\n"))
        }
    else if (isNaN(splitMessage[0])) {
        message.channel.send("JSHELP Search is not ready yet")
    }
    else {
        extractPageData(parseInt(splitMessage[0]))
        }
    }
})