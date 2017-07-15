'use strict';

const registerUser = require('../Services/registerUser');
const postMessage = require('../Services/postMessage');
const esdf = require('esdf');

// this.requires('authDB');
module.exports = function() {
  this.requires('repository');
  this.provides('services', function({repository}) {
    const serviceContainer = new esdf.services.ServiceContainer();
    // serviceContainer.addResource('config', config);
    serviceContainer.addResource('repository', repository);
    // serviceContainer.addResource('authDB', authDB);

    serviceContainer.addService('registerUser', registerUser);
    serviceContainer.addService('postMessage', postMessage);
    // Object.keys(serviceFunctions).forEach(function(serviceName) {
    // })
    return serviceContainer;
  })
}
