const https = require('https');

const apiRoot = 'https:\/\/gelbooru.com/index.php?page=dapi&s=post&q=index';
const Gelbooru = function (tags) {
    this.tags = [];
    this.tagsToExclude = [];

    this.getTagString = () => {
        let tagString = '';
        this.tags.forEach(tag => {
            if (tagString === '') {
                tagString += tag;
            } else {
                tagString += '+' + tag;
            }
        });

        this.tagsToExclude.forEach(tag => {
            if (tagString === '') {
                tagString += '-' + tag;
            } else {
                tagString += '+-' + tag;
            }
        });

        return tagString;
    };

    this.getTopImage = (callback) => {
        getData(buildImageRetrieveUrl(this.getTagString(), 1), (img) => {
            if (img.length === 0) {
                return callback('no image found');
            }
            callback(null, img[0]);
        });
    };

    this.getRandomImage = (callback) => {
        this.getImageCount((count) => {

            if (count == 0) {
                return callback('No images found for tags ' + this.getTagString());
            }

            const pageNumber = parseInt(((Math.random() * count) + 1), 10);
            const url = buildImageRetrieveUrl(this.getTagString(), 1, pageNumber);

            getData(url, (response) => {
                if (!response || response.length < 1) {
                    return callback('no images found');
                }

                if (response[0].file_url.indexOf('https:') != 0) {
                    response[0].file_url = 'https:' + response[0].file_url;
                }
                callback(null, response[0]);
            })
        })
    };

    this.getImageCount = (callback) => {
        getData(buildImageRetrieveUrl(this.getTagString(), 0, 1, false), (response) => {
            callback(/(?:count=")([0-9]+)/.exec(response)[1]);
        })
    };
}

function buildImageRetrieveUrl(tags, count, page, json = true) {
    let url = apiRoot + `&tags=${tags}`

    if (count !== undefined && count !== null) {
        url += `&limit=${count}`;
    }

    if (page !== undefined && page !== null) {
        url += `&pid=${page}`;
    }

    if (json) {
        url += '&json=1';
    }
    return url;
}

function getData(url, callback) {
    const isJson = url.indexOf('&json=1') > -1;
    https.get(url, (res) => {
        res.setEncoding('utf8');
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (isJson && data) {
                callback(JSON.parse(data));
            } else {
                callback(data);
            }
        })
    });
}

module.exports = function (tags, safeOnly) {
    const obj = new Gelbooru(tags)

    if (tags instanceof Array) {
        tags.forEach(tag => obj.tags.push(tag));
    } else {
        obj.tags.push(tags);
    }

    if (safeOnly === true) {
        obj.tags.push('rating:safe');
    } else if (safeOnly === false) {
        obj.tags.push('rating:explicit');
    }

    return obj;
}