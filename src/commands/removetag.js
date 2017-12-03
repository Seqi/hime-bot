handle = (msg) => {
    if (!this.hasPermission(msg.author)) {
        console.log(`${msg.author.username} attempted to use ${this.tag} `)
        return
    }

    msg.channel.send(`${this.tag} called`)
}

hasPermission = (user) => {
    return true
}

module.exports.tag = 'removetag'
module.exports.handle = handle
module.exports.hasPermission = hasPermission