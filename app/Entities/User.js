'use strict';

class User {
  constructor() {
    this.name = null;
    this.email = null;
    this.registered = false;
  }

  getName() {
    return this.name;
  }

  register({ name, email }) {
    this.name = name;
    this.email = email;
    this.registered = true;
  }

  isRegistered() {
    return this.registered
  }
}

module.exports = User;
