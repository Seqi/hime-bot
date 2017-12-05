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
        if (src.booru.tagsToExclude.indexOf(word) > -1 ||
            src.booru.tags.indexOf(word) > -1) {
            errors.push(word)
        } else {
            src.booru.tagsToExclude.push(word)
        }
    })

    if (errors.length > 0) {
        msg.channel.send(`Cannot ignore tag already being ignored or tracked(${errors.join(', ')})`)
    }

    msg.channel.send(src.booru.getPrintableTagString())
}

hasPermission = (user) => {
    return true
}

module.exports.tag = 'ignoretags'
module.exports.handle = handle
module.exports.hasPermission = hasPermission