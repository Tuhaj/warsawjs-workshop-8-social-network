'use strict';

const modules = [
  require('./Modules/sink'),
  require('./Modules/repository'),
  require('./Modules/streamer'),
  require('./Modules/services'),
  require('./Modules/subscriber'),
  require('./Modules/publisher'),
  require('./Modules/projectionDB'),
  require('./Modules/projectionBuilder')
]

const CompositionManager = require('app-compositor').CompositionManager;
const app = new CompositionManager();
app.runModules(modules).done(async function({ streamer, subscriber, services }) {
  streamer.start();
  subscriber.queue('eventLogger').bind('*.*').listen(function({event, commit}) {
    console.log('* %s, %s: %j', commit.aggregateType, event.eventType, event.eventPayload);
  })
  const registerUser = services.service('registerUser');
  registerUser({ userID: 'uuid42', name: 'Standard esdf usr', email: 'InventTheFutureWithThePast@gmail.com', password: 'dupa.8'});
  const postMessage = services.service('postMessage');
  postMessage({ body: 'hello!', title: 'World!', id: 'someid1213!', userID: 'uuid42'})
});
