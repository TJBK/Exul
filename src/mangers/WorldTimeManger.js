import fs from 'fs-extra'

class WorldTimerManager {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  start () {
    console.log(this.client.guilds.get('392774640424189962').channels.array().filter(x => 'TextChannel'))
  }
}

export { WorldTimerManager }
