let Danbooru = require('danbooru')
let config = require('./config').danbooru

function booru (){
    let booru = new Danbooru(config.user, config.token)

    this.downloadRandomImage = (tags) => {
        return booru.posts({
            limit: 1,
            random: true,
            tags: tags
        })
            .then(posts => {
                if (!posts || posts.length < 1) {
                    return Promise.reject('No images found.')
                }
                console.log(posts[0].file)
                
                return posts[0].file.download()
            })
    }

    return this
}

module.exports = booru()