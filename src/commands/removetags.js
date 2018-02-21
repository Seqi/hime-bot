handle = (msg) => {
    let words = msg.content.split(' ')
    words.splice(0, 2)

    let channel = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!channel) return

    let errors = []
    words.forEach(word => {
        let index = channel.tags.searchTags.indexOf(word)
        if (index < 0) {
            errors.push(word)
        } else {
            channel.tags.searchTags.splice(index, 1)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`I cannot remove these tag that I am not currently searching: (${errors.join(', ')})`)
    }

    msg.channel.send(channel.tags.getTagString())
}

module.exports.aliases = ['removetag', 'removetags']
module.exports.handle = handle
module.exports.requiresAdmin = true