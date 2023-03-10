const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES]
});
const token = "MzYzNjI1OTUzNzgxNjEyNTQ1.GWjhBJ.mS-srnIC9W0RwCmi5Km0VwRgcURyETF5qxC8RI"
var killProcess = require('kill-process-by-name');

var sys = require('util')
var exec = require('child_process').exec;
client.on('messageCreate', message => {
    if (message.author.id == "238718268049719296" && message.content == "!reload")
    {
        killProcess('index.js');
        exec('node index.js')
    }
});

client.login(token);