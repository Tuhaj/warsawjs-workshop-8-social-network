'use strict';

// const projectionDB = require('./Modules/projectionDB');
const eventHandlers = {
  'User.Registered': function(db, event, commit) {
    db.ref(`/profiles/${commit.sequenceID}`).update({
      ID: commit.sequenceID,
      name: event.eventPayload.name,
      email: event.eventPayload.email,
      encryptedPassword: event.eventPayload.encryptedPassword
    })
  }
}

module.exports = function() {
  this.requires('subscriber');
  this.requires('projectionDB');
  this.provides('projectionBuilder', function({ subscriber, projectionDB }) {
    subscriber.queue('projectionBuilder').bind('*.*').listen(function({ event, commit }) {
      const eventName = `${commit.aggregateType}.${event.eventType}`;

      if(eventHandlers[eventName]) {
        return eventHandlers[eventName](projectionDB, event, commit);
      }
    })
  });
}

