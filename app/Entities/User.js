'use strict';

const esdf = require('esdf');

class User extends esdf.core.EventSourcedAggregate {
  constructor() { // should be empty list of args
    super();
    this.name = null;
    this.email = null;
    this._registered = false;
  }

  getName() {
    return this.name;
  }

  register({ name, email }) {
    // this._stageEvent(new esdf.core.Event('Registered', {}));
    this.name = name;
    this.email = email;
    this._registered = true;
  }

  isRegistered() {
    return this._registered
  }
}

module.exports = User;
