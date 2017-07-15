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
  }

  getName() {
    return this._name;
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

  isRegistered() {
    return this._registered
  }
}

module.exports = User;
