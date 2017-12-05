const gelbooru = require('./gelbooru')
const config = require('./config').bot

let channels = []

channel = (discord) => {

    this.getChannel = (id) => {
        return channels.find(server => server.id === id)
    }

    this.addChannel = (id, nsfw = false) => {
        let explicitness = (nsfw ? '-' : '') + 'rating:safe'
        channels.push({
            id,
            booru: new gelbooru(config.images.tags.concat(explicitness)),
            channel: discord.channels.find(server => server.id === id)
        })

        console.log(`Connected bot to ` + this.getChannel(id).channel.name)
    }

    return this
}
module.exports = channel