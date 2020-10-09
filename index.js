const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const auth = require('./auth.json')
client.login(auth.token)
const prefix = "jshelp"
const pages = fs.readdirSync("./pages")
var helppages = fs.readdirSync("./pages")

client.on('ready', () => {
    console.log("Bot is on!")
})
client.on('message', message => {
    //FUNCTIONS
    function makeEmbed(title, input) {
        const embed = new Discord.MessageEmbed()
        embed.setColor("#fff700")
        embed.setAuthor("Help Bot (Javascript)", client.user.avatarURL())
        embed.setDescription(input.replace(/>>/g, "    "))
        if (title) embed.setTitle(title)
        message.channel.send({embed: embed})
    }
    function extractPageData(pagenum, callback) {
        const thisPage = fs.readdirSync("./pages")[pagenum - 1]
        try {
            var title, desc
            var filedat = fs.readFileSync(__dirname + "\\pages\\" + thisPage, "utf8")
            filedat = filedat.replace(/\r/g, "").split(/[\n]/)
            desc = filedat[1]
            title = filedat[0]
            filedat.shift()
            filedat = filedat.join("\n")
            callback(title, filedat)
        }
        catch (err) { throw err }
    }
    //TRIGGERS
    const splitMessage = message.content.startsWith(prefix + " ") ? message.content.split(/ (.+)/)[1].split(" ") : ""
    if (splitMessage != "") {
        if (splitMessage[0] == "help") {
            var helppages = fs.readdirSync("./pages")
            for (i = 0; i < helppages.length; i++) {
                helppages[i] = "**[" + helppages[i].split("_")[0] + "]** " + helppages[i].split("_")[1]
            }
            makeEmbed("Docs (do `jshelp #`)", helppages.join("\n"))
        }
    else if (isNaN(splitMessage[0])) {
        message.channel.send("JSHELP Search is not ready yet")
    }
    else {
            extractPageData(parseInt(splitMessage[0]), function (title, desc) {
                makeEmbed(title, desc)
            })
            
        }
    }
})