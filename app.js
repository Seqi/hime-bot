const Discord = require('discord.js');
const client = new Discord.Client();

const config = require(`./config.${process.env.NODE_ENV || 'development'}.js`);
const gelbooru = require('./gelbooru');

client.on('ready', () => {
    console.log('Bot connected as %s - %s', client.user.username, client.user.id);
    
    var gelb = new gelbooru('1girl', true);
    var g2 = new gelbooru('hime_cut', false);

    console.log(gelb.getTagString());
    console.log(g2.getTagString());

    gelb.getTopImage((err, img) => console.log(img.id));
     g2.getTopImage((err, img) => console.log(img.id));
});

client.on('message', msg => {
    var gelb = new gelbooru(msg.content, true);
    var g2 = new gelbooru('hime_cut', false);

    if (msg.author.username === 'seqi') {
        gelb.getTopImage((img) => msg.channel.send(JSON.stringify(img, 4)));        
        g2.getTopImage((img) => msg.channel.send(JSON.stringify(img, 4)));        
    }
})

client.login(config.discord.token);