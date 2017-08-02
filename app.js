const Discord = require('discord.js');
const client = new Discord.Client();

const config = require(`./config.${process.env.NODE_ENV || 'development'}.js`);
const gelbooru = require('./gelbooru');

const TAGS_TO_IGNORE = [];
const TAG = 'hime_cut';

const SFW_TAG = TAG + '+rating:safe';
const NSFW_TAG = TAG + '+rating:explicit';

const ADMIN_IDS = [
    '177120846861697024'
]

const SERVER_IDS = [
    '338741523380436993'
];

const SFW_CHANNEL_IDS = [
    '338741996367773696',
]

const NSFW_CHANNEL_IDS = [
    '338742017586757632'
]

const DEV_SERVER_ID = '341347176930213889';

const IMAGE_POST_INTERVAL_MILLIS = 1000 * 60 * 30;

client.on('ready', () => {
    console.log('Bot connected as %s - %s', client.user.username, client.user.id);

    const sfwChannels = client.channels.filter(channel => SFW_CHANNEL_IDS.indexOf(channel.id) > -1).array();
    const nsfwChannels = client.channels.filter(channel => NSFW_CHANNEL_IDS.indexOf(channel.id) > -1).array();


    setInterval(function () {
        let tag = TAG;
        if (TAGS_TO_IGNORE.length > 0) {
            tag += '+-' + TAGS_TO_IGNORE.join('+-');
        }

        for (let i = 0; i < sfwChannels.length; i++) {
            gelbooru.getRandomImage(tag, (err, result) => {
                console.log(new Date().toTimeString() + 'posting ' + result.file_url + ' to ' + sfwChannels[i].name);
                sfwChannels[i].send(result.file_url);
            });
        }
    }, IMAGE_POST_INTERVAL_MILLIS);

    setInterval(() => {
        let tag = TAG;
        if (TAGS_TO_IGNORE.length > 0) {
            tag += '+-' + TAGS_TO_IGNORE.join('+-');
        }

        for (let i = 0; i < nsfwChannels.length; i++) {
            gelbooru.getRandomImage(tag, (err, result) => {
                console.log(new Date().toTimeString() + 'posting ' + result.file_url + ' to ' + nsfwChannels[i].name);
                nsfwChannels[i].send(result.file_url);
            });
        }
    }, IMAGE_POST_INTERVAL_MILLIS);
});

client.on('message', msg => {
    if (ADMIN_IDS.indexOf(msg.author.id) > -1) {
        const parts = msg.content.split(' ');

        const command = parts[0];
        const parameter = parts[1];

        if (command === 'ignoretag') {
            TAGS_TO_IGNORE.push(parameter);
            msg.reply('Ignoring ' + parameter);

            let tag = TAG;
            if (TAGS_TO_IGNORE.length > 0) {
                tag += '+-' + TAGS_TO_IGNORE.join('+-');
            }
            msg.reply('new tag string: ' + tag);
        }
    }


    if (msg.guild.id == DEV_SERVER_ID && msg.author.id !== client.user.id && msg.content === 'test') {
        let tag = TAG;
        if (TAGS_TO_IGNORE.length > 0) {
            tag += '+-' + TAGS_TO_IGNORE.join('+-');
        }
        gelbooru.getRandomImage(tag, (err, result) => {
            if (err) {
                msg.channel.send(err);
            } else {
                msg.channel.send(result.file_url);
            }
        });
    }
})

client.login(config.discord.token);