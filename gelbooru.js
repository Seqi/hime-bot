const https = require('https');

const apiRoot = 'https:\/\/gelbooru.com/index.php?page=dapi&s=post&q=index';
function buildImageRetrieveUrl(tags, count, page, json = true) {
    apiRoot += `&tags=${tags}`

    if (count !== undefined && count !== null) {
        apiRoot += `&count=${count}`;
    }

    if (page !== undefined && page !== null) {
        apiRoot += `&pid=${page}`;
    }

    if (json) {
        apiRoot += '&json=1';
    }
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

const Gelbooru = {
    getTopImage: (tags, callback) => {
        getData(buildImageRetrieveUrl(tags, 1), callback);
    },

    getRandomImage: (tags, callback) => {
        getImageCount(tags, (count) => {

            if (count == 0) {
                return callback('No images found for tags ' + tags);
            }

            const pageNumber = parseInt(((Math.random() * count) + 1), 10);
            const url = buildImageRetrieveUrl(tags, 1, pageNumber);

            getData(url, (response) => {
                if (!response || response.length < 1) {
                    return callback('no images found');
                }

                if (response[0].file_url) {
                    response[0].file_url = 'https:' + response[0].file_url;
                }
                callback(null, response[0]);
            })
        })
    },

    getImageCount: (tags, callback) => {
        getData(buildImageRetrieveUrl(tags, 0, 1, false), (response) => {
            callback(/(?:count=")([0-9]+)/.exec(response)[1]);
        })
    }
}

module.exports = Gelbooru;