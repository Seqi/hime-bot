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
        let index = src.booru.tags.indexOf(word)
        if (index < 0) {
            errors.push(word)
        } else {
            src.booru.tags.splice(index, 1)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`I cannot remove these tag that I am not currently searching: (${errors.join(', ')})`)
    }

    msg.channel.send(src.booru.getPrintableTagString())
}

module.exports.aliases = ['removetag', 'removetags']
module.exports.handle = handle
module.exports.requiresAdmin = true