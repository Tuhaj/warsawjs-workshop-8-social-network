'use strict';

const modules = [
  require('./Modules/sink'),
  require('./Modules/repository')
]

const CompositionManager = require('app-compositor').CompositionManager;
const app = new CompositionManager();
app.runModules(modules).done(function({ repository }) {
  const User = require('./Entities/User');
  repository.invoke(User, 'uuidv4', async function(user) {
    await user.register({ name: 'Piotr', email: '314zientara@gmail.com', password: 'dupa.8'});
    console.log("is Registered: %s", user.isRegistered());
  });
});
