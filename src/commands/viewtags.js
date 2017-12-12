let channel = require('../channel')

handle = (msg) => {
    if (!this.hasPermission(msg.author)) {
        console.log(`${msg.author.username} attempted to use ${this.tag} `)
        return
    }
    
    let src = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!src) return
    
    msg.channel.send(src.booru.getPrintableTagString())
}

hasPermission = (user) => {
    return true
}

module.exports.tag = 'viewtags'
module.exports.handle = handle
module.exports.hasPermission = hasPermission