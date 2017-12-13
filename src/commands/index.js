const fs = require('fs')
const config = require('../config')
const permissions = require('../permissions')

const commands = fs.readdirSync(__dirname).filter(dir => dir != 'index.js').map(dir => require(`./${dir}`))

module.exports.process = (msg) => {
    let parts = msg.content.split(' ')

    // Move the mention to the front if there was one
    if (wasBotMentioned(msg)) {
        let mentionIdx = parts.indexOf(`<@${msg.client.user.id}>`)

        if (mentionIdx > 0) {
            parts.unshift(parts.splice(mentionIdx, 1))
        }
    }

    let command = commands.find(cmd => cmd.aliases.indexOf(parts[1]) > -1)

    // Check command exists
    if (!command) {
        return msg.reply('I do not understand your request. Please use my \'help\' command to view my functions.')
    }

    // Check user has permission to execute
    if (command.requiresAdmin) {
        let isAdmin = permissions.isBotAdminOfGuild(msg.author, msg.channel.guild)

        if (!isAdmin) {
            console.log(`${msg.author.username} attempted to use ${this.tag} `)
            msg.reply('I\'m sorry, my master has prevented me from performing that function for you.')
            return
        }
    }

    command.handle(msg)
}

wasBotMentioned = (msg) => !!msg.mentions.users.find(user => user.id === msg.client.user.id)