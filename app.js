const Discord = require('discord.js');
const client = new Discord.Client();

const config = require(`./config.${process.env.NODE_ENV || 'development'}.js`);
const Gelbooru = require('./gelbooru');

const CHANNELS = [
    {
        // DEV
        id: '341347176930213889',
        nsfw: false
    },
    {
        id: '338741996367773696',
        nsfw: false,
    },
    {
        id: '338742017586757632',
        nsfw: true,
    }
];

const COMMANDS = [
    '!himebot',
    '!addtag',
    '!removetag',
    '!ignoretag',
    '!unignoretag',
    '!viewtags',
    '!postimage'
]

const IMAGE_POST_INTERVAL = 1000 * 60 * 30;

client.on('ready', () => {
    console.log('Bot connected as %s - %s', client.user.username, client.user.id);

    CHANNELS.forEach(c => {
        const channel = client.channels.find(x => x.id == c.id);
        c.gelbooru = new Gelbooru('hime_cut', !c.nsfw);
        console.log(`Connected bot to ` + channel.name);

        setInterval(() => {
            c.gelbooru.getRandomImage((err, result) => {
                if (err) {
                    return console.log(err);
                }

                const url = result.file_url;

                console.log(`Posting ${url} to ${channel.name}`);
                client.channels.find(chnl => chnl.id === channel.id).send(url);
            });
        }, IMAGE_POST_INTERVAL);
    });
});

client.on('message', msg => {
    // For now, only let me give it commands
    // Ignore messages from ourselves
    if (msg.author.id === client.user.id) { return; }

    const msgParts = msg.content.split(' ');
    const command = msgParts[0];

    // Ignore commands that aren't listed and ensure we have an argument
    if (COMMANDS.indexOf(command) === -1) { return; }

    // FOR MIZU
    if (command === COMMANDS[0]) {
        const compliments = ['thanks', 'thanks!', 'thank you', 'thank you!', 'arigatou'];
        const message = msgParts.slice(1, msgParts.length).join(' ');

        if (compliments.indexOf(message.toLowerCase()) > -1) {
            return msg.reply('You\'re welcome, ' + msg.author.username + '!');
        }
    }

    // For tag manipulation, ensure the message comes from a registered channel
    var server = CHANNELS.find(x => x.id === msg.channel.id);
    if (!server) { return; }

    // Only let me do tag stuff for now
    if (msg.author.id !== '177120846861697024') {
        return;
    }

    // Add Tag
    if (command === COMMANDS[1]) {
        if (msgParts.length < 2) {
            msg.reply('Missing argument.');
        }

        const tag = msgParts[1];
        server.gelbooru.tags.push(tag);
        msg.channel.send('Adding tag ' + tag);
        msg.channel.send('Now searching: ' + server.gelbooru.tags.join(', '));
    }
    // Remove tag
    else if (command === COMMANDS[2]) {
        if (msgParts.length < 2) {
            msg.reply('Missing argument.');
        }

        const tag = msgParts[1];
        const tagIndex = server.gelbooru.tags.indexOf(tag);

        if (tagIndex === -1) {
            msg.channel.send('Tag was not being searched.');
        }

        server.gelbooru.tags.splice(tagIndex, 1);
        msg.channel.send('Removed ' + tag);
        msg.channel.send('Now searching: ' + server.gelbooru.tags.join(', '));
    }
    else if (command === COMMANDS[3]) {
        if (msgParts.length < 2) {
            msg.reply('Missing argument.');
        }

        const tag = msgParts[1];
        server.gelbooru.tagsToExclude.push(tag);
        msg.channel.send('Ignoring tag ' + tag);
        msg.channel.send('Now ignoring: ' + server.gelbooru.tagsToExclude.join(', '));
    }
    // View tags
    else if (command == COMMANDS[5]) {
        msg.channel.send('Searching tags: ' + server.gelbooru.tags.join(', '));
    }
    else if (command == COMMANDS[6]) {
        server.gelbooru.getRandomImage((err, img) => {
            msg.channel.send(img.file_url);
        });
    }
})

client.login(config.discord.token);