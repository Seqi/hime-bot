const config = require(`./config.${process.env.NODE_ENV || 'development'}.js`); 
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot connected as %s - %s', client.user.username, client.user.id);
});

client.on('message', msg => {
    if (msg.author.id !== client.user.id) {
        msg.channel.sendMessage('Hello world!');
    }
})

client.login(config.discord.token);