import moment from 'moment-timezone'

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
      {area: 'Europe/London', city: 'London'},
      {area: 'Europe/Paris', city: 'Paris'},
      {area: 'Europe/Moscow', city: 'Moscow'},
      {area: 'Australia/Sydney', city: 'Sydney'},
      {area: 'Asia/Bangkok', city: 'Bangkok'},
      {area: 'America/New_York', city: 'NYC'},
      {area: 'America/Los_Angeles', city: 'LA'}
    ]
    let str = ''
    for (let i in time) {
      let t = time[i]
      str += ' | ' + ct(t.city, t.area)
    }
    let newStr = str.substr(3)
    return newStr
  }

  workOutTime (city, area) {
    return city + ':' + moment().tz(area).format('H:mm')
  }
}

export { WorldTimerManager }
