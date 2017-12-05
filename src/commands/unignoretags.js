handle = (msg) => {
    if (!this.hasPermission(msg.author)) {
        console.log(`${msg.author.username} attempted to use ${this.tag} `)
        return
    }

    let words = msg.content.split(' ')
    words.splice(0, 2)

    let src = channel(msg.client).getChannel(msg.channel.id)

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
        msg.channel.send(`Cannot remove tag not being tracked (${errors.join(', ')})`)
    }

    msg.channel.send(src.booru.getPrintableTagString())
}

hasPermission = (user) => {
    return true
}

module.exports.tag = 'unignoretags'
module.exports.handle = handle
module.exports.hasPermission = hasPermission