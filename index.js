const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token, bot_age, words_array, bot_info} = require('./config.json');
const PREFIX = "-"

client.once('ready', () => {
    console.log(prefix);
    console.log(token);
    console.log(bot_age);
    console.log(words_array[0]);
    console.log(words_array[1]);
    console.log(words_array[2]);
    console.log(bot_info.name);
    console.log(bot_info.version);
});

client.login(token)

client.on('message', message => {
    if(message.content === `${prefix}ping`) {
        message.channel.send('Pong!')
    }else if(message.content === `${prefix}Hi`) {
        message.channel.send('Sup!')
    }
});

const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);
const checkPermissionsRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMEBRS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

client.on('message', function(message) {
    if(message.author.bot) return;
    if(isValidCommand(message, "Hello!"))
        message.reply("Sup Bitch!");
    else if(isValidCommand(message, 'add')) {
        let args = message.content.toLowerCase().substring(5);
        let { cache } = message.guild.roles;
        let role = cache.find(role => role.name.toLowerCase() === args);
        if(role) {
            if(message.member.roles.cache.has(role.id)) {
                message.channel.send("You already have this role!");
                return;
            }
            if(checkPermissionsRole(role)) {
                 message.channel.send("You cannot add yourself to this role!");
                }
                else {
                    message.member.roles.add(role)
                        .then(member => message.channel.send("You were added successfully!"))
                        .catch(err => {
                            console.log(err);
                            message.channel.send("Stop trying to do bad things, you can't add roles higher than the bot.");
                        });
                }

        }
        else {
            message.channel.send("Role not found dummy!");
        }
    }
});