import { secondsToString } from "../bot"

exports.execute = (interaction, args, client) => {

    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 4,
        data: {
          content: `Uptime: ${secondsToString(process.uptime())}`,
          flags: 64
        }
      }})

}
