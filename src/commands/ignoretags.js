handle = (msg) => {
    let words = msg.content.split(' ')
    words.splice(0, 2)

    let src = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!src) return

    let errors = []
    words.forEach(word => {
        if (src.booru.tagsToExclude.indexOf(word) > -1 ||
            src.booru.tags.indexOf(word) > -1) {
            errors.push(word)
        } else {
            src.booru.tagsToExclude.push(word)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`I am already ignoring or searching for these tags (${errors.join(', ')})`)
    }

    msg.channel.send(src.booru.getPrintableTagString())
}

hasPermission = (user) => {
    return user.id === '177120846861697024'
}

module.exports.aliases = ['ignoretag', 'ignoretags']
module.exports.handle = handle
module.exports.requiresAdmin = true