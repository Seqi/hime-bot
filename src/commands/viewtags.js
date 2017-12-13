let channel = require('../channel')

handle = (msg) => {    
    let src = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!src) return
    
    msg.channel.send(src.booru.getPrintableTagString())
}

hasPermission = (user) => {
    return true
}

module.exports.aliases = ['viewtags', 'showtags']
module.exports.handle = handle
module.exports.requiresAdmin = false