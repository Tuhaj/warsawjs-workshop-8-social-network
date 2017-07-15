'use strict';

const firebase = require('firebase');
const config = require('../config');

var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: "https://esdf-e0981.firebaseio.com",
  projectId: "esdf-e0981",
  storageBucket: "",
  messagingSenderId: config.messagingSenderId
};


module.exports = function() {
  this.provides('projectionDB', function() {
    const app = firebase.initializeApp(firebaseConfig);
    const db = app.database();
    return app.auth().signInWithEmailAndPassword(config.email, config.password).then(
      () => db
    );
  })
}
