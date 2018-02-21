const event = require('./bot-event')
const config = require('./config').bot
const TagStore = require('./tags')

let channels = []

let c = (discord) => {

    this.getChannel = (id) => {
        return channels.find(server => server.id === id)
    }

    this.addChannel = (id, interval = 60, nsfw = false) => {
        let explicitness = (nsfw ? '-' : '') + 'rating:safe'
        let channel = {
            id,
            interval,
            tags: new TagStore(explicitness, ...config.images.tags),
            channel: discord.channels.find(server => server.id === id)
        }

        channels.push(channel)
        event.register(channel)

        console.log(`Connected bot to ` + this.getChannel(id).channel.name)
    }

    return this
}

module.exports = c