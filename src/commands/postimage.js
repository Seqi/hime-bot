handle = (msg) => {
    let channel = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!channel) return

    channel.booru.getRandomImage((err, imgUrl) => {
        if (err) {
            msg.channel.send('Sorry, I was unable to find an image..')
        }
        
        msg.channel.send(imgUrl.file_url)
    })
}

hasPermission = (user) => {
    return true
}

module.exports.aliases = ['postimage']
module.exports.handle = handle
module.exports.requiresAdmin = false