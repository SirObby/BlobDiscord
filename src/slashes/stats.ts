import { bot } from "../command"
import { Discord } from "../bot"
import { secondsToString } from "../bot"

exports.execute = async (interaction, args, client) => {

    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 4,
        data: {
          content: `GuildCount: ${client.guilds.cache.size}\nMemberCount: ${client.users.cache.size}\nRAM: ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)}MB\nUPTIME: ${secondsToString(process.uptime())} (Dosent display correclty)`,
          flags: 64
        }
      }})

}
