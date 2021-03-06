const event = require('../bot-event')

handle = (msg) => {
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

module.exports.aliases = ['changeinterval', 'updateinterval']
module.exports.handle = handle
module.exports.requiresAdmin = true