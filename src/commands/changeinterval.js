const event = require('../bot-event')

handle = (msg) => {
    if (!this.hasPermission(msg.author)) {
        console.log(`${msg.author.username} attempted to use ${this.tag} `)
        return
    }

    let words = msg.content.split(' ')

    if (words.length != 3) {
        msg.reply('Please only supply how long you wish for me to retrieve images (in minutes).')
    }

    let interval = Number(words[2])

    if (isNaN(interval)) {
        msg.reply('I can only process numbers.')
    }


    let channel = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!channel) return

    // Set the new interval in the channel config
    channel.interval = interval

    // Clear the old event loop
    clearInterval(channel.event)

    // Set the new one
    event.register(channel)

    msg.channel.send(`Now retrieving an image for you every ${interval} minutes.`)
}

hasPermission = (user) => {
    return user.id === '177120846861697024'
}

module.exports.tag = 'changeinterval'
module.exports.handle = handle
module.exports.hasPermission = hasPermission