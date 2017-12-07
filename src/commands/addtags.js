handle = (msg) => {
    if (!this.hasPermission(msg.author)) {
        console.log(`${msg.author.username} attempted to use ${this.tag} `)
        return
    }

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
            src.booru.tags.push(word)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`Cannot add tag already being tracked or ignored (${errors.join(', ')})`)
    }

    msg.channel.send(src.booru.getPrintableTagString())
}

hasPermission = (user) => {
    return user.id === '177120846861697024'
}

module.exports.tag = 'addtags'
module.exports.handle = handle
module.exports.hasPermission = hasPermission