module.exports = {
    "discord": {
        "token": process.env.DISCORD_APITOKEN
    },
    "danbooru": {
        "user": process.env.DANBOORU_USER,
        "token": process.env.DANBOORU_APITOKEN
    },
    "bot": {
        "adminRoles": ["your-custom-roles"],
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