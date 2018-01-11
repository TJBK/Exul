class WorldTimerManager {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  start () {
    this.run()
    this.client.setInterval(() => {
      this.run()
    }, 60000)
  }

  run () {
    let guilds = this.client.guilds.array()
    for (let i in guilds) {
      let channels = guilds[i].channels.array().filter(x => 'TextChannel')
      for (let i in channels) {
        if (channels[i].type === 'text') {
          channels[i].setTopic(this.time(), 'Channel')
        }
      }
    }
  }

  time () {
    let ct = this.workOutTime
    let time = [
      {area: 'London', zone: 0},
      {area: 'Paris', zone: 1},
      {area: 'Moscow', zone: 3},
      {area: 'Sydney', zone: 11},
      {area: 'Wellington', zone: 12},
      {area: 'NYC', zone: -5},
      {area: 'LA', zone: -8}
    ]
    let str = ''
    for (let i in time) {
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
