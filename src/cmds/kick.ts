import { bot } from "../command"
import { Discord } from "../bot"

export const init = (command) => {
    console.log(`${command} has been initialised!`)
}

export const execute = (message, command, args, client) => {

    let guild = message.guild

    if (message.member.hasPermission('KICK_MEMBERS')) {

        /*if (message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.channel.send("I do not have the permission to do so.")
        }*/

        if (args[0]) {

            let member = message.mentions.members.first()

            if (member.bannable) {

                let highestM = message.member.roles.highest
                let highest2 = member.roles.highest

                if (highestM.comparePositionTo(highest2) > 0) {

                    args.shift()

                    let reason = args.join(" ")

                    let embed = new Discord.MessageEmbed()
                        .setColor(0x7289da)
                        .setFooter(`You have been kicked from ${guild.name} by ${message.member.user.tag} because of ${reason}`)

                        try {

                            let embed2 = new Discord.MessageEmbed()
                        .setColor(0x7289da)
                        .setFooter(`You have kicked ${member.user.tag} because of ${reason} (Could not notify)`)

                        message.channel.send(embed2)

                        message.channel.send(embed2)

                            member.kick({
                                reason: reason,
                            })
                        }catch (e ) {
                            console.log(e)
                        }
                    

                } else {
                    if (highestM.comparePositionTo(highest2) < 0 || highestM.comparePositionTo(highest2) == 0) {

                        return message.channel.send("You are not higher or are equal to to this member in hierarchy")

                    }
                }



            }

        } else {
            message.channel.send("No arguments!")
        }

    } else {
        return message.channel.send("No permission.")
    }

}