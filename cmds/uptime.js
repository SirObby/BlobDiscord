const Discord = require('discord.js');

exports.init = (command) => {
    console.log(`${command} has been initialised!`)
}

function secondsToString(seconds) {
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = Math.floor(seconds % 60);

    var str = "";

    if (days > 0) {
        str += days + ":";
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    str += `${days}:${hours}:${minutes}:${seconds}`

    return str;
}

exports.execute = (message, command, args, client) => {

    message.channel.send('Checking Uptime...').then (msg => {
        msg.edit(`Uptime: ${secondsToString(process.uptime())}`);
    })

}