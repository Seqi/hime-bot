const booru = require('../danbooru')

handle = (msg) => {
    let channel = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!channel) return

    booru.downloadRandomImage(channel.tags.getTags())
        .then(img =>  msg.channel.send('', { file: img }))
        .catch(err => {
            console.log(`Error posting image to ${msg.channel.name}: ${err}`)
            msg.channel.send('Sorry, I was unable to find an image..')
        })
}

module.exports.aliases = ['postimage']
module.exports.handle = handle
module.exports.requiresAdmin = false