handle = (msg) => {
    if (!this.hasPermission(msg.author)) {
        console.log(`${msg.author.username} attempted to use ${this.tag} `)
        return
    }

    let channel = require('../channel')(msg.client).getChannel(msg.channel.id)
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

module.exports.tag = 'postimage'
module.exports.handle = handle
module.exports.hasPermission = hasPermission