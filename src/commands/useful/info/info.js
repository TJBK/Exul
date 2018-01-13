let commands = {
  name: 'info',
  category: 'useful',
  use: '<command>',
  desc: 'provides info about the bot',
  process: async (msg, suffix, client, serverDoc, db, utl) => {
    try {
      msg.channel.send({
        embed: {
          title: 'Info about me :3',
          description: 'I\'ve been ripped apart',
          fields: [{
            name: 'Creater',
            value: 'I was made with :heart: by TJBK#6368',
            inline: true
          },
          {
            name: 'Language',
            value: 'I\'m running on ' + process.version + ' of NodeJS',
            inline: true
          },
          {
            name: 'Framework',
            value: 'I\'m made with the master branch of [discord.js](https://discord.js.org/#/)',
            inline: true
          }],
          footer: {
            text: 'To find a full list of all my commands just do ' + serverDoc.prefix + 'help'
          }
        }
      }).then(message => message.delete({timeout: 120000}))
      msg.delete()
    } catch (err) {
      msg.channel.send('Fail' + err).then(message => message.delete({timeout: 60000}))
    }
  }
}

export { commands }
