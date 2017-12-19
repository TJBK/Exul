class ServerManger {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  addServer (id) {
    let db = this.db
    let server = new db.ServerDB({
      _id: id,
      prefix: '>?',
      countryTimeChannel: []
    })
    server.save((err, serverInfo) => { if (err) throw err })
    this.updateStatus()
  }

  userJoin (member) {
    this.updateStatus()
  }

  userLeave (member) {
    this.updateStatus()
  }

  deleteServer (id) {
    let db = this.db
    db.remove({_id: id}, (err) => { if (err) throw err })
    this.updateStatus()
  }

  updateStatus () {
    this.client.user.setPresence({
      game: {
        name: 'with ' + this.client.users.size + ' people',
        type: 0
      }
    })
  }
}

export { ServerManger }
