const Scheduler = require('./scheduler')
const moment = require('moment')

module.exports = class SlappNag {
  constructor (slapp, opts = {}) {
    this.slapp = slapp
    this.scheduler = new Scheduler(opts)
    this.activeNags = []

    // set up middleware to catch user response and cancel the nag
    this.slapp.use((msg, next) => {
      let i
      const n = this.activeNags.find(({userId}, idx) => {
        if (msg.meta.user_id === userId) { i = idx; return true }
        return false
      })
      if (n) {
        this.scheduler.remove(n.nag)
        this.activeNags.splice(i, 1)
      }
      next()
    })
  }

  ask ({ msg, state, ask, route, remind, repeat, deadline }) {
    const userId = msg.meta.user_id
    const expire = moment(remind).seconds()

    // send the message right away
    msg.say(ask).route(route, state, expire) /* expire just before new event */

    // set up the recurring action via the scheduler
    let nag = this.scheduler.add(remind, repeat, () => {
      msg.say('Hey, just a reminder that I still need an answer from you:')
      msg.say(ask).route(route, state, expire)
    })

    // push to active nags so it can be cancelled on user response
    this.activeNags.push({userId, nag})
  }
}
