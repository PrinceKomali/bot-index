const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs-extra')
const auth = require('./auth.json')
client.login(auth.token)
const prefix = "jshelp"
const git = require('simple-git')()
var pages = fs.readdirSync("./pages")
var helppages = fs.readdirSync("./pages")


client.on('ready', () => {
    console.log("Bot is on!")
})
client.on('message', message => {
    function search(input) {
        for (i = 0; i < pages.length; i++) {
            if (pages[i].toLowerCase().includes(input)) {
                return i + 1
                break
            }
            if (i == pages.length && !pages[i].toLowerCase().includes(input)) return null
        }
    }
    function makeEmbed(title, input) {
        const embed = new Discord.MessageEmbed()
        embed.setColor("#fff700")
        embed.setAuthor("Help Bot (Javascript)", client.user.avatarURL())
        embed.setDescription(input.replace(/>>/g, "    "))
        if (title) embed.setTitle(title)
        message.channel.send({ embed: embed })
    }
    function extractPageData(pagenum, callback) {
        var thisPage = fs.readdirSync("./pages")
        thisPage.sort(function (a, b) {
            return parseInt(a.split("_")[0] - parseInt(b.split("_")[0]));
        });
        thisPage = thisPage[pagenum - 1]
        //console.log(thisPage)
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
    if (message.content == "jshelp git update" && message.author.id == "327879060443234314") {

        
           
        const handlerFn = () => {
        };
        fs.rmdirSync("./updates/empty", { recursive: true });

        if (!fs.existsSync("./updates/empty")) {
            fs.mkdirSync("./updates/empty");

        }
        const repoURL = 'https://github.com/PrinceKomali/bot-index/';
        const localPath = './updates/empty';
        const options = []
        git.clone(repoURL, localPath, options, handlerFn())
        .then(() => {
        fs.copy('./updates/empty/pages', './pages', function (err) {
            if (err) {
                message.channel.send("An Error occured```\n" + err + "\n```")
            } else {
                pages = fs.readdirSync("./pages")
                helppages = fs.readdirSync("./pages");
                makeEmbed(null, "Updated `" + __dirname + "\\pages` with " + pages.length + " files")
            }
        });
        })
    } else {
    //FUNCTIONS
    
    //TRIGGERS
    const splitMessage = message.content.startsWith(prefix + " ") ? message.content.split(/ (.+)/)[1].split(" ") : ""
    if (splitMessage != "" || message.content == prefix) {
        
        if (splitMessage[0] == "help" || message.content == prefix) {
            var helppages = fs.readdirSync("./pages")
            
            helppages.sort(function (a, b) {
                return parseInt(a.split("_")[0] - parseInt(b.split("_")[0]));
            });
            for (i = 0; i < helppages.length; i++) {
                
                helppages[i] = "**[" + helppages[i].split("_")[0] + "]** " + helppages[i].split("_")[1].split(".")[0]
            }
            makeEmbed("Docs (do `jshelp #`)", helppages.join("\n"))
        }
        else if (isNaN(splitMessage[0])) {
            var searching = search(splitMessage[0])
            //console.log(searching)
            if (searching) {
                extractPageData(searching, function (title, desc) {
                    makeEmbed(title, desc)
                })
            }
            else {
                makeEmbed(null, "Invalid Search Term")
            }
        //message.channel.send("JSHELP Search is not ready yet")
    }
    else {
            extractPageData(parseInt(splitMessage[0]), function (title, desc) {
                makeEmbed(title, desc)
            })
            
        }
    }
    }
})
