const gelbooru = require('./gelbooru')
const config = require('./config').bot

let channels = []

channel = (discord) => {

    this.getChannel = (id) => discord.channels.find(server => server.id === id)

    this.addChannel = (id, nsfw = false) => {
        let explicitness = (nsfw ? '-' : '') + 'rating:safe'
        channels.push({
            id,
            booru: new gelbooru(config.images.tags.concat(explicitness))
        })

        console.log(`Connected bot to ` + channel.name)
    }

    return this
}
module.exports = channel