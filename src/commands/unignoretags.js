handle = (msg) => {
    let words = msg.content.split(' ')
    words.splice(0, 2)

    let channel = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!channel) return

    let errors = []
    words.forEach(word => {
        let index = channel.tags.excludeTags.indexOf(word)
        if (index < 0) {
            errors.push(word)
        } else {
            channel.tags.excludeTags.splice(index, 1)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`I cannot remove these tag that I am not currently ignoring:  (${errors.join(', ')})`)
    }

    msg.channel.send(channel.tags.getTagString())
}

module.exports.aliases = ['unignoretags']
module.exports.handle = handle
module.exports.requiresAdmin = true