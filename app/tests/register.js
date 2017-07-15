'use strict';

const User = require('../Entities/User');
const assert = require('assert');

describe('User', function() {
  describe('#constructor', function() {
    it('should not register the user right away', function() {
      const user = new User();
      assert.equal(user.isRegistered(), false);
    })
  });
  describe('#register', function() {
    it('should make the user registered', function() {
      const user = new User();
      user.register({ name: 'Piotr', email: '314zientara@gmail.com'})
      assert.equal(user.isRegistered(), true);
      assert.equal(user.getName(), 'Piotr');
      console.log(user.getStagedEvents());
    })

    it('should not registered again the same user', function() {
      const user = new User();
      user.register({ name: 'Piotr', email: '314zientara@gmail.com'});
      let eventsCountBefore = user.getStagedEvents().length;
      user.register({ name: 'Piotr', email: '314zientara@gmail.com'});
      let eventsCountAfter = user.getStagedEvents().length;
      assert.equal(eventsCountBefore, eventsCountAfter);
    })
  })
});
