import { bot } from "../command"
import { Discord } from "../bot"
import { ytdl } from "../bot"

export const execute = async (interaction, args, client) => {

    //return client.api.interactions(interaction.id, interaction.token).callback.post({
    //    data: {
    //      type: 4,
    //      data: {
    //        content: "Music commands in slash commands are broken, use `blobplay` instead",
    //        flags: 64
    //      }
    //    }
    //  })


    let url = ""

    interaction.data.options.forEach(element => {
        
        if(element.name == "url") {
            url = element.value
        }

    });

    let queue = bot.getQueue

    let member = await client.guilds.cache.get(interaction.guild_id).members.fetch(interaction.member.user.id)

    if (member.voice.channel) {

        let songInfo;
        let songLink;


        const loading = new Discord.MessageEmbed()

            .setColor(0x7289da)

            .setDescription('Fetching data!')
            .setFooter('Please wait patiently.')
            ;


        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                content: "Loading..",
                embeds: [loading]
            }
          }}) 
          //let arr = []

          

          console.log(url)
        if (url.startsWith('https://www.youtube.com/')) {
            songInfo = await ytdl.getInfo(url);

            let song = {
                title: songInfo.videoDetails.title,
                author: songInfo.videoDetails.author,
                likes: songInfo.videoDetails.likes,
                dislikes: songInfo.videoDetails.dislikes,
                url: songInfo.videoDetails.video_url,
                age_restricted: songInfo.videoDetails.age_restricted,
                video_length: songInfo.videoDetails.lengthSeconds,
                requested_by: interaction.member.user.username + interaction.member.user.discriminator
            };

    
            //message.react('✔')
            if (!queue[interaction.guild_id]) {
                queue[interaction.guild_id] = [];
            }
            queue[interaction.guild_id].push(song);
    
            bot.changeQueue(queue)
    
            if (queue[interaction.guild_id].length == 1) {
    
                bot.setDispatchSlash(interaction, member);
            } else {
    
                const addedqueue = new Discord.MessageEmbed()
    
                .setColor(0x7289da)
    
                .setDescription(`**${queue[interaction.guild_id][queue[interaction.guild_id].length - 1].title}** was added to the queue!`)
                ;
    
                new Discord.WebhookClient(client.user.id, interaction.token).send(addedqueue)
            }

        } else {
            const error = new Discord.MessageEmbed()
    
                .setColor(0xFF0000)
    
                .setDescription(`Incorrect argument. Argument must be a URL.`)
                ;
    
                new Discord.WebhookClient(client.user.id, interaction.token).send(error)

        }
        


    } else {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
              content: `You need to be in an voice channel!`,
              flags: 64
            }
          }})
    }

    const embed = new Discord.MessageEmbed()

        .setTitle('BlobDiscord')

        .setColor(0x7289da)

        //.setDescription('To view anything run <help> <argument>')
        .addField(`Information`, `[Invite](https://discord.com/api/oauth2/authorize?client_id=795196567241883659&permissions=8&scope=bot) [Support Server](https://discord.gg/dNfDBUC6Tu)\nMade By \`Sir Obsidian#2640\``, true)
        
        ;


}