import { bot } from "../command"
import { Discord } from "../bot"

exports.init = (command) => {
    console.log(`${command} has been initialised!`)
}

exports.execute = (message, command, args, client) => {

    if(!args[0]) {

    const embed = new Discord.MessageEmbed()

        .setTitle('BlobDiscord')

        .setColor(0x7289da)

        .setDescription('To view anything run <help> <argument>')
        .addField(`Anti Raid`, `MAX_MESSAGES`, true)
        .addField(`Moderation`, `ban\nkick`, true)
        .addField(`Commands`, `help\ninfo\nping\nuptime`, true)
        .addField(`Music Commands`, `play\nskip\nqueue\nstop`, true)
        ;

    message.channel.send(embed);

    }

    if(args[0] == "help") {

        const embed = new Discord.MessageEmbed()

        .setTitle('<:790171307290394685:798587736155488326> Help')

        .setColor(0x7289da)

        .setDescription('Wait this is a subcommand?')
        //.addField(`<:delete:787038088010399778>`, `MAX_MESSAGES, MAX_MENTIONS`, true)
        
        ;

    message.channel.send(embed);

    }

    if(args[0] == "info") {

        const embed = new Discord.MessageEmbed()

        .setTitle('<:790171307290394685:798587736155488326> Info')

        .setColor(0x7289da)

        .setDescription('Shows bot information.')
        //.addField(`<:delete:787038088010399778>`, `MAX_MESSAGES, MAX_MENTIONS`, true)
        
        ;

    message.channel.send(embed);

    }

    if(args[0] == "ping") {

        const embed = new Discord.MessageEmbed()

        .setTitle('<:790171307290394685:798587736155488326> Ping')

        .setColor(0x7289da)

        .setDescription('Shows bot latency.')
        //.addField(`<:delete:787038088010399778>`, `MAX_MESSAGES, MAX_MENTIONS`, true)
        
        ;

    message.channel.send(embed);

    }

    if(args[0] == "ping") {

        const embed = new Discord.MessageEmbed()

        .setTitle('<:790171307290394685:798587736155488326> Uptime')

        .setColor(0x7289da)

        .setDescription('Shows bot uptime.')
        //.addField(`<:delete:787038088010399778>`, `MAX_MESSAGES, MAX_MENTIONS`, true)
        
        ;

    message.channel.send(embed);

    }

    if(args[0] == "MAX_MESSAGES") {

        const embed = new Discord.MessageEmbed()

        .setTitle('<:ban:801415398863929364> MAX_MESSAGES')

        .setColor(0x7289da)

        .setDescription('This filter works by limiting the maximum amount of messages within 10 seconds.\nLimit ( 7messages / 10 seconds)')
        //.addField(`<:delete:787038088010399778>`, `MAX_MESSAGES, MAX_MENTIONS`, true)
        
        ;

    message.channel.send(embed);

    }

    if(args[0] == "MAX_MENTIONS") {

        const embed = new Discord.MessageEmbed()

        .setTitle('<:ban:801415398863929364> MAX_MENTIONS')

        .setColor(0x7289da)

        .setDescription('This filter works by limiting the maximum amount of mentions within 10 seconds.\nLimit ( 5 mentions / 10 seconds)')
        //.addField(`<:delete:787038088010399778>`, `MAX_MESSAGES, MAX_MENTIONS`, true)
        
        ;

    message.channel.send(embed);

    }
}