const Discord = require('discord.js');
const client = new Discord.Client();

const config = require(`./config.${process.env.NODE_ENV || 'development'}.js`);
const gelbooru = require('./gelbooru');

const TAG = 'hime_cut';
const SFW_TAG = TAG + '+rating:safe';
const NSFW_TAG = TAG + '+rating:explicit';

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

    // Set up SFW
    const sfwChannels = client.channels.filter(channel => SFW_CHANNEL_IDS.indexOf(channel.id) > -1).array();
    const nsfwChannels = client.channels.filter(channel => NSFW_CHANNEL_IDS.indexOf(channel.id) > -1).array();

    setInterval(function() {
        for (let i = 0; i < sfwChannels.length; i++) {
            gelbooru.getRandomImage(SFW_TAG, (err, result) => {
                console.log('posting ' + result.file_url + ' to ' + sfwChannels[i].name);
                sfwChannels[i].send(result.file_url);
            });
        }
    }, IMAGE_POST_INTERVAL_MILLIS);

    setInterval(() => {
        for (let i = 0; i < nsfwChannels.length; i++) {
            gelbooru.getRandomImage(NSFW_TAG, (err, result) => {
                console.log('posting ' + result.file_url + ' to ' + sfwChannels[i].name);
                nsfwChannels[i].send(result.file_url);
            });
        }
    }, IMAGE_POST_INTERVAL_MILLIS);
});

client.on('message', msg => {
    if (msg.guild.id == DEV_SERVER_ID && msg.author.id !== client.user.id && msg.content === 'test') {
        gelbooru.getRandomImage(SFW_TAG, (err, result) => {
            msg.channel.send(result.file_url);
        });
    }
})

client.login(config.discord.token);