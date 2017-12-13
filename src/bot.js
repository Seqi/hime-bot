const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config')
const commands = require('./commands')
const channel = require('./channel')(client)

const BotCommand = '!himebot'

client.on('ready', () => {
    console.log('Bot connected as %s - %s', client.user.username, client.user.id);

    let channels = config.bot.channels
    if (!channels) {
        throw Error('At least one channel is required')
    }

    channels.forEach(c => {
        channel.addChannel(c.id, c.interval, c.nsfw)
    })
});

client.on('message', msg => {
    if (!msg.content.startsWith(BotCommand) && !msg.mentions.users.find(user => user.id === client.user.id)) {
        return
    }

    if (msg.content.split(' ').length < 2) {
        return msg.reply(`Type '${BotCommand} help' to view a list of commands`)
    }

    commands.process(msg)
})

if (!config.discord.token) {
    throw Error('No discord token was found')
}

client.login(config.discord.token);