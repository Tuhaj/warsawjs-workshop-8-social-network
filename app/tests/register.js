'use strict';

describe('User', function() {
  describe('#constructor', function() {
    it('should not register the user right away', function() {
      const user = new User();
      assert.equal(user.isRegistered(), false);
    })
  });
});
