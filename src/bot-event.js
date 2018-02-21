const booru = require('./danbooru')

let event = (channel) => {
    booru.downloadRandomImage(channel.tags.getTags())
        .then(img => {
            console.log(img)
            channel.channel.send('', { file: img })
        })
        .catch(err => {
            console.log(`Error posting image to ${channel.channel.name}: ${err}`)
            channel.channel.send('Sorry, I was unable to find an image..')
        })
}

let register = (channel) => {
    channel.event = setInterval(() => event(channel), 1000 * 30 )//* 60 * channel.interval)
}

module.exports.register = register
module.exports.event = event