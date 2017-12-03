const fs = require('fs')

const commands = fs.readdirSync(__dirname)
    .filter(dir => dir != 'index.js')
    .map(dir => require(`./${dir}`))

module.exports.process = (msg) => {
    let parts = msg.content.split(' ')

    let command = commands.find(cmd => cmd.tag === parts[1])
    
    if (!command) {
        msg.reply('Command does not exist. Use the command \'help\' to view a list of possible commands.')
    }

    command.handle(msg)
}