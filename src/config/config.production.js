module.exports = {
    "discord": {
        "token": process.env.DISCORD_APITOKEN
    },
    "danbooru": {
        "token": process.env.DANBOORU_APITOKEN
    },
    "bot": {
        "images": {
            "tags": ["hime_cut"]
        },
        "channels":
            [
                {
                    "id": "",
                    "interval": 60,
                    "nsfw": false
                }
            ]
    }
}