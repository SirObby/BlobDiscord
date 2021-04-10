import { bot } from "../command"
import { Discord } from "../bot"
import { ytdl } from "../bot"

exports.init = (command) => {
    console.log(`${command} has been initialised!`)

}

exports.execute = async (message, command, args, client) => {

    if(!args[0]) {
        const eeee = new Discord.MessageEmbed()
    
                .setColor(0xFF0000)
    
                .setDescription(`Missing argument!`)
                ;
    
                return message.channel.send(eeee);
    }

    let queue = bot.getQueue

    if (message.member.voice.channel) {
        /*connection = await message.member.voice.channel.join();
        connection.voice.setSelfDeaf(true);*/
        let songInfo;
        let songLink;
        //if (!args[1]) return message.channel.send('Provide a YouTube link or a YouTube search term!');

        const loading = new Discord.MessageEmbed()

            .setColor(0x7289da)

            .setDescription('Fetching data!')
            .setFooter('Please wait patiently.')
            ;


        let msg = await message.channel.send(loading)



        if (args[0].includes('https://www.youtube.com/')) {
            songInfo = await ytdl.getInfo(args[0]);

            let song = {
                title: songInfo.videoDetails.title,
                author: songInfo.videoDetails.author,
                likes: songInfo.videoDetails.likes,
                dislikes: songInfo.videoDetails.dislikes,
                url: songInfo.videoDetails.video_url,
                age_restricted: songInfo.videoDetails.age_restricted,
                video_length: songInfo.videoDetails.lengthSeconds,
                requested_by: message.author.tag
            };
    
            if (song.age_restricted) {
                if (!message.channel.nsfw) {
                    return message.channel.send(`Sorry, but you cannot play an Age Restricted video on a non-nsfw channel!`)
                }
            }
    
            //message.react('✔')
            if (!queue[message.guild.id]) {
                queue[message.guild.id] = [];
            }
            queue[message.guild.id].push(song);
    
            bot.changeQueue(queue)
    
            if (queue[message.guild.id].length == 1) {
    
                bot.setDispatch(message, msg);
            } else {
    
                const addedqueue = new Discord.MessageEmbed()
    
                .setColor(0x7289da)
    
                .setDescription(`**${queue[message.guild.id][queue[message.guild.id].length - 1].title}** was added to the queue!`)
                ;
    
                msg.edit(addedqueue);
            }

        } else {
            const error = new Discord.MessageEmbed()
    
                .setColor(0xFF0000)
    
                .setDescription(`Incorrect argument. Argument must be a URL.`)
                ;
    
                msg.edit(error);
            
            /*songLink = await YouTubeSearcher.getVideo(args.join(' ').slice(configs.prefix.length).slice(args[0].length)).then(video => video.url)
            songInfo = await ytdl.getInfo(songLink);*/
        }
        


    } else {
        message.reply('you need to be in a voice channel to use this command!')
    }

}