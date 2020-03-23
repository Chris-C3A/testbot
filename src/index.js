// require('dotenv').config();
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

const newUsers = new Discord.Collection();
// TODO if bot joined server than increment botcount
let botcount = 4;
let totalusers;

// TODO try code from documentaion and see if it wokrs(use embed-test branch)


client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
    // if message doesnt start with the prefix or the user is a bot return
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else if (args[0] === "status") {
            return message.channel.send(`${message.guild.createdAt}`);
        }

        message.channel.send(`First argument: ${args[0]}`);
    } else if (command === 'kick') {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else if (command === 'prune') {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 100.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    } else if (command === 'embed') {
        const embed = new Discord.MessageEmbed();
        embed.setTitle("A slick little embed");
        embed.setColor(0xff0000);
        embed.setDescription("Hello, there");

        message.channel.send(embed);
    }



    if (message.content === `${prefix}serverinfo`) {
        message.channel.send("Total users: " + totalusers);
        //message.guild.createdAt
    }

});

client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.get('691050833118232580');
    channel.send(`Hey ${member.user}, welcome to **${member.guild.name}**!, there are ${member.guild.memberCount} users`);
    newUsers.set(member.id, member.user);
    console.info(newUsers);
    totalusers = member.guild.memberCount-botcount;
});

client.on('guildMemberRemove', member => {
    member.guild.channels.get('691338097031512196').send(member.user + " left the server");
    if(newUsers.has(member.id)) newUsers.delete(member.id);
    totalusers = member.guild.memberCount-botcount;
});

client.login(token);

// bot.on("guildMemberAdd", (member) => {
//   const guild = member.guild;
//   newUsers.set(member.id, member.user);

//   if (newUsers.size > 10) {
//     const defaultChannel = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
//     const userlist = newUsers.map(u => u.toString()).join(" ");
//     defaultChannel.send("Welcome our new users!\n" + userlist);
//     newUsers.clear();
//   }
// });
// bot.on('messageDelete', (message) => {
  
// });

function get_corona_data(cmd) {

}