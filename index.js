const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./auth.json')
client.login(auth.token)