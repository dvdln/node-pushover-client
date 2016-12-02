const fetch = require('node-fetch');
const FormData = require('form-data');

const endpoint = 'https://api.pushover.net/1/messages.json';

const rename = new Map()
  .set('urlTitle', 'url_title');

class PushoverClient {
  constructor(defaults = {}) {
    this.defaults = Object.assign({
      token: process.env.PUSHOVER_TOKEN,
      user: process.env.PUSHOVER_USER
    }, defaults);
  }

  send(options = {}) {
    const form = new FormData();

    if (typeof options === 'string') {
      options = {message: options};
    }

    for (let [key, value] of filterOptions(this.defaults, options)) {
      form.append(key, value);
    }

    return fetch(endpoint, {
      method: 'POST',
      body: form
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === 0) {
        throw Object.assign(new Error('Failed to send message'), res);
      }
      return res;
    });
  }
}

function * filterOptions(...sources) {
  for (let [k, v] of Object.entries(Object.assign({}, ...sources))) {
    if (typeof v !== 'undefined') {
      yield [(rename.has(k) ? rename.get(k) : k), v];
    }
  }
}

module.exports = PushoverClient;
