import * as utl from './../utl.js'

class CommandsManger {
  constructor (client, db) {
    this.client = client
    this.db = db
    this._commands = []
  }

  load () {
    this._commands = []
    let client = this.client
    let cmds = client.mangers.dimport.getImport('commands')
    Object.keys(cmds).forEach(file => {
      let commands = cmds[file]
      this._commands.push(commands)
    })
    client.commands = this._commands
  }

  checkMessage (msg) {
    let serverID = msg.guild.id
    let client = this.client
    let db = this.db
    if (msg.author.id === client.user.id) return
    if (msg.author.id === '172763890994642944' | msg.author.id === '401605862755663872' && msg.content.startsWith('.lice')) {
      let args = msg.content.split(' ')
      msg.channel.send(msg.author.username + ' has given ' + args[1] + ' ' + args[2] + ' lice')
    }
    db.ServerDB.findOne({_id: serverID}, async (err, serverDoc) => {
      if (err) throw err
      if (!serverDoc) client.mangers.server.addServer(serverID)
      if (msg.content.startsWith(serverDoc.prefix)) this.handle(msg, serverDoc)
    })
  }

  handle (msg, serverDoc) {
    let commands = this._commands
    let db = this.db
    let cmdtext = msg.content.split(' ')[0].substring(serverDoc.prefix.length).toLowerCase()
    let suffix = msg.content.substring(cmdtext.length + serverDoc.prefix.length + 1)
    let cmd = commands.find(x => x.name === cmdtext)
    try {
      cmd.process(msg, suffix, this.client, serverDoc, db, utl)
    } catch (err) {}
  }
}

export { CommandsManger }
