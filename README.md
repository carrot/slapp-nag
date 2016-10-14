# Slapp Nag

[![npm](https://img.shields.io/npm/v/slapp-nag.svg?style=flat-square)](https://npmjs.com/package/slapp-nag)
[![tests](https://img.shields.io/travis/carrot/slapp-nag.svg?style=flat-square)](https://travis-ci.org/carrot/slapp-nag?branch=master)
[![dependencies](https://img.shields.io/david/carrot/slapp-nag.svg?style=flat-square)](https://david-dm.org/carrot/slapp-nag)
[![coverage](https://img.shields.io/coveralls/carrot/slapp-nag.svg?style=flat-square)](https://coveralls.io/r/carrot/slapp-nag?branch=master)

A nag feature for slackbots, because people ignore things a lot. To be used with slapp.

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm install slapp-nag -S`

> **Note:** This project is compatible with node v6+ only

### Usage

```js
const slapp = require('slapp')
const Nag = require('slapp-nag')
const nag = new Nag(slapp, {
  store: { host: '127.0.0.1', password: 'xxx' } // not yet implemented
})

// ...other slapp bot logic

slapp.route('askNameAndNag', (msg, state) => {
  msg.say("Sounds good, I'll remind you later!")
  // ask this question, then remind them once, in an hour
  nag.ask({
    msg,
    state // optional, state will be passed through
    ask: 'What is your name', // this is a full slack msg object
    route: 'routeName',
    remind: { hours: 1 }
  })
  // don't ask right now, but remind them every day starting tomorrow
  nag({ msg,
    ask: 'What is your name',
    route: 'routeName',
    remind: { days: 1 },
    repeat: true
  })
  // ask, then remind with increasing frequency up to a given deadline
  nag.ask({ msg,
    ask: 'What is your name',
    route: 'routeName',
    remind: { days: 1 },
    deadline: '10/15/2016' // not yet implemented
  })
})
```

The user will see something like this:

```
**Bot**: What is your name?
... user doesn't respond ...
**Bot**: Hey, just a reminder that I still need your answer to this question:
**Bot**: What is your name?
```

The bot will continue making this request until the user responds. It will then continue on to the route as named.

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
