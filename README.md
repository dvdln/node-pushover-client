# node-pushover-client
Send push notifications to iOS and Android using [Pushover][site].

## Usage
[Register an application with Pushover.net][site-app] to get your application and user tokens.
You can set `PUSHOVER_TOKEN` and `PUSHOVER_USER` environment variables to use as defaults.

```js
var Pushover = require('node-pushover-client');

var client = new Pushover({
  token: 'KzGDORePK8gMaC0QOYAMyEEuzJnyUi',
  user: 'uQiRzpo4DXghDmr9QzzfQu27cmVRsG'
})
.send({message: 'Hello World'})
.then(res => console.log(res));
```

## Command Line Usage
```sh
$ npm -g install node-pushover-client
$ pushover --help
```

## Options
The options object uses the same parameters outlined in [Pushover's API][site-api].

  [site]:           https://pushover.net                "Pushover"
  [site-app]:       https://pushover.net/apps/build     "Pushover: Register Application"
  [site-api]:       https://pushover.net/api            "Pushover API"
