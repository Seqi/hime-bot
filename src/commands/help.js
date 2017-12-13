handle = (msg) => {
    let content = `I am capable of the following commands:
    
postimage: I will fetch an image for you based on the current search tags

addtags: Add tags to use for my searches

removetags: Remove tags I am using for my searches

ignoretags: Add tags to ignore

unignoretags: Remove tags that I am currently ignoring

viewtags: View tags that I am using for my searches

changeinterval: Change the interval in which I perform my duties`

    msg.channel.send(content)
}

hasPermission = (user) => {
    return true
}

module.exports.aliases = ['help']
module.exports.handle = handle
module.exports.requiresAdmin = false