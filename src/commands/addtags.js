handle = (msg) => {
    let words = msg.content.split(' ')
    words.splice(0, 2)

    let channel = require('../channel')(msg.client).getChannel(msg.channel.id)
    if (!channel) return

    let errors = []
    words.forEach(word => {
        if (channel.tags.excludeTags.indexOf(word) > -1 ||
            channel.tags.searchTags.indexOf(word) > -1) {
            errors.push(word)
        } else {
            channel.tags.searchTags.push(word)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`I am already ignoring or searching for these tags: (${errors.join(', ')})`)
    }

    msg.channel.send(channel.tags.getTagString())
}

module.exports.aliases = ['addtag', 'addtags'] 
module.exports.handle = handle
module.exports.requiresAdmin = true;