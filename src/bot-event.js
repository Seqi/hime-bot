let register = (channel) => {
    let event = () => {
        channel.channel.send(new Date().getTime())
    }

    channel.event = setInterval(event, 1000 * 60 * channel.interval)
}

module.exports.register = register