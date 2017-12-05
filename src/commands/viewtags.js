let channel = require('../channel')

handle = (msg) => {
    if (!this.hasPermission(msg.author)) {
        console.log(`${msg.author.username} attempted to use ${this.tag} `)
        return
    }

    let src = channel(msg.client).getChannel(msg.channel.id)
    msg.channel.send(src.booru.getPrintableTagString())
}

hasPermission = (user) => {
    return true
}

module.exports.tag = 'viewtags'
module.exports.handle = handle
module.exports.hasPermission = hasPermission