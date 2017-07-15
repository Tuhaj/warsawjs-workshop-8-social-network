'use strict';

const esdf = require('esdf');
const bcrypt = require('bcrypt');

class User extends esdf.core.EventSourcedAggregate {
  constructor() { // should be empty list of args
    super();
    this._name = null;
    this._email = null;
    this._password = null;
    this._registered = false;
    this._messages = [];
  }

  getName() {
    return this._name;
  }

  postMessage(body, title, id) {
    if(this._messages.includes(id)) {
      return;
    }
    this._stageEvent(new esdf.core.Event('MessagePosted', {body, title, id}));
  }

  async getPasswordHash(password) {
    return await bcrypt.hash(password, 5)
  }

  async register({ name, email, password }) {
    if(this._registered) {
      return;
    }
    const encryptedPassword = await this.getPasswordHash(password);
    this._stageEvent(new esdf.core.Event('Registered', {name, email, encryptedPassword}));
  }

  onRegistered(event) {
    this._registered = true;
    this._name = event.eventPayload.name;
  }

  onMessagePosted(event) {
    console.log("posted!");
    this._messages.push(event.eventPayload.id);
  }

  isRegistered() {
    return this._registered
  }
}

module.exports = User;
