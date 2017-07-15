'use strict';

const esdf = require('esdf');

class User extends esdf.core.EventSourcedAggregate {
  constructor() { // should be empty list of args
    super();
    this._name = null;
    this._email = null;
    this._registered = false;
  }

  getName() {
    return this._name;
  }

  register({ name, email }) {
    if(this._registered) {
      return;
    }
    this._stageEvent(new esdf.core.Event('Registered', {name, email}));
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
