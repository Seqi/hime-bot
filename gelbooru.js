const https = require('https');

const apiRoot = 'https:\/\/gelbooru.com/index.php?page=dapi&s=post&q=index';
const Gelbooru = {

    getTopImage: (tags, callback) => {
        const url = `${apiRoot}&tags=${tags}&limit=1&json=1`;
        getData(url, callback);
    },

    getRandomImage: (tags, callback) => {
        getImageCount(tags, (count) => {

            if (count == 0) {
                callback('No images found for tags ' + tags);
            }

            const pageNumber = parseInt(((Math.random() * count) + 1), 10);
            if (pageNumber === 0) {

            }

            const url = `${apiRoot}&tags=${tags}&limit=1&json=1&pid=${pageNumber}`;

            getData(url, (response) => {
                console.log(response);
                if (!response || response.length < 1) {
                    callback('no images found');
                }

                // Turn the file_url into a http link
                if (response[0].file_url) {
                    response[0].file_url = 'https:' + response[0].file_url;
                }
                callback(null, response[0]);
            })
        })
    }
}

function getImageCount(tags, callback) {
    var url = `${apiRoot}&tags=${tags}&limit=0`;

    getData(url, (response) => {
        callback(/(?:count=")([0-9]+)/.exec(response)[1]);
    })
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

module.exports = Gelbooru;