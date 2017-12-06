let event = (channel) => {
    channel.booru.getRandomImage((err, imgUrl) => {
        if (err) {
            channel.channel.send('Sorry, I was unable to find an image..')
        }

        channel.channel.send(imgUrl.file_url)
    })

    clearInterval(channel.event)
    channel.event = setInterval(() => event(channel), 1000 * 60 * channel.interval)
}

let register = (channel) => {
    channel.event = setInterval(() => event(channel), 1000 * 60 * channel.interval)
}

module.exports.register = register
module.exports.event = event