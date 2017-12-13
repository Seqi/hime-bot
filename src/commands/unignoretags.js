handle = (msg) => {
    let words = msg.content.split(' ')
    words.splice(0, 2)

    let src = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!src) return

    let errors = []
    words.forEach(word => {
        let index = src.booru.tagsToExclude.indexOf(word)
        if (index < 0) {
            errors.push(word)
        } else {
            src.booru.tagsToExclude.splice(index, 1)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`I cannot remove these tag that I am not currently ignoring:  (${errors.join(', ')})`)
    }

    msg.channel.send(src.booru.getPrintableTagString())
}

module.exports.aliases = ['unignoretags']
module.exports.handle = handle
module.exports.requiresAdmin = true