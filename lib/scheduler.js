const EventEmitter = require('events')
const moment = require('moment')

module.exports = class Scheduler extends EventEmitter {
  constructor (opts) {
    super()
    this.clock = setInterval(() => { this.emit('tick') }, opts.tickFrequency || 10000)
    // TODO: deal with the store here
  }

  add (frequency, repeat, callback) {
    let fireAt = moment().add(frequency)
    const listener = () => {
      if (moment().isSameOrAfter(fireAt)) {
        callback()
        if (repeat) {
          fireAt = moment().add(frequency)
        } else {
          this.remove(listener)
        }
      }
    }
    this.on('tick', listener)
    return listener
  }

  remove (listener) {
    this.removeListener('tick', listener)
  }
}
