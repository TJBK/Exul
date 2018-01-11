let commands = {
  name: 'setup',
  category: 'admin',
  use: '<command> <instruction> <suffix>',
  desc: 'The is prefix that\'s all you need at the moment',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    if (!utl.isAdmin(msg.member)) return msg.reply('Sorry you don\'t have perms for that').then(message => message.delete({timeout: 60000})).catch(console.error)
    let setupMsg = await msg.channel.send({
      embed: {
        title: 'Setup',
        fields: [
          {
            name: 'prefix',
            value: 'Choose your prefix',
            inline: true
          }
        ],
        footer: {
          text: 'Type what you want to setup up'
        }
      }
    }).catch(console.error)
    let collector = msg.channel.createMessageCollector(m => m.content, {max: 1})
    collector.on('collect', m => m.delete())
    collector.on('end', collected => collected.map(async x => {
      let setupText = x.content
      let serverID = x.guild.id
      switch (setupText) {
        case 'prefix':
          setupMsg.edit({
            embed: {
              title: 'Options',
              description: 'Type the prefix you want'
            }
          }).catch(console.error)
          let prefixCollector = msg.channel.createMessageCollector(m => m.content, {max: 1})
          prefixCollector.on('collect', m => m.delete())
          prefixCollector.on('end', collected => collected.map(x => {
            db.ServerDB.update({ _id: serverID }, {$set: { prefix: x.content }}, (err, newPrefix) => {
              if (err) throw err
              setupMsg.edit({embed: {title: 'Done'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
            })
          }))
          break
        default:
          setupMsg.edit({embed: {title: 'Check your spelling'}}).then(message => message.delete({timeout: 120000})).catch(console.error)
      }
      msg.delete().catch(console.error)
    }))
  }
}

export { commands }
