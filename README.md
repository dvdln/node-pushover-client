# node-pushover-client
Send push notifications to iOS and Android using [Pushover][site].

Compatible with Pushover 3.0 api, it now can send an attached image.

## Usage
[Register an application with Pushover.net][site-app] to get your application and user tokens.

```js
const Pushover = require('node-pushover-client');

const client = new Pushover({
  token: 'KzGDORePK8gMaC0QOYAMyEEuzJnyUi',
  user: 'uQiRzpo4DXghDmr9QzzfQu27cmVRsG'
});

client
  .send({message: 'Hello World'})
  .then(res => console.log(res));
```

You can set `PUSHOVER_TOKEN` and `PUSHOVER_USER` environment variables to use as defaults.

```js
new Pushover().send({message: 'Hello World'});
```

There's also a static `send` method.

```js
Pushover.send({
  token: 'KzGDORePK8gMaC0QOYAMyEEuzJnyUi',
  user: 'uQiRzpo4DXghDmr9QzzfQu27cmVRsG',
  message: 'Hello World'
});
```

You also can attach an image. Full filepath must be specified.
Pushover's api limits must be followed: "Each message may only include one attachment, and attachments are currently limited to 2,621,440 bytes (2.5 megabytes)."

```js
Pushover.send({
  token: 'KzGDORePK8gMaC0QOYAMyEEuzJnyUi',
  user: 'uQiRzpo4DXghDmr9QzzfQu27cmVRsG',
  message: 'Hello World',
  attachment: FILEPATH
});
```

## Command Line Usage
```sh
$ npm -g install node-pushover-client
$ pushover --help
```

## Options
The options object uses the same parameters outlined in [Pushover's API][site-api].
Any `snake_case` option can also be written in `camelCase`.

  [site]:           https://pushover.net                "Pushover"
  [site-app]:       https://pushover.net/apps/build     "Pushover: Register Application"
  [site-api]:       https://pushover.net/api            "Pushover API"
