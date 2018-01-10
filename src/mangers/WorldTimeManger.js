class WorldTimerManager {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  start () {
    this.run()
    this.client.setInterval(() => {
      console.log('run')
      this.run()
    }, 60000)
  }

  run () {
    let guilds = this.client.guilds.array()
    for (let i = 0; i < guilds.length; i++) {
      let channels = guilds[i].channels.array().filter(x => 'TextChannel')
      for (let i = 0; i < channels.length; i++) {
        if (channels[i].type === 'text') {
          channels[i].setTopic(this.time(), 'Channel')
        }
      }
    }
  }

  time () {
    let ct = this.workOutTime
    let time = [
      {area: 'PST', zone: -8},
      {area: 'MST', zone: -7},
      {area: 'CST', zone: -6},
      {area: 'BST', zone: 0},
      {area: 'WET', zone: 0},
      {area: 'CET', zone: 1},
      {area: 'EET', zone: 2}
    ]
    let str = ''
    for (let i = 0; i < time.length; i++) {
      let t = time[i]
      str += ' | ' + ct(t.area, t.zone)
    }
    let newStr = str.substr(3)
    return newStr
  }

  workOutTime (area, offset) {
    let date = new Date()
    let utc = date.getTime() - (date.getTimezoneOffset() * 60000)
    let now = new Date(utc + (3600000 * offset))
    let split = now.toLocaleString().split(' ').splice(1)
    return area + ':' + split.toLocaleString()
  }
}

export { WorldTimerManager }
