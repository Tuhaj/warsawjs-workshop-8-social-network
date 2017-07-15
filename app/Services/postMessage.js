'use strict';
const User = require('../Entities/User')

module.exports = async function postMessage({ repository, config }, params) {
  return await repository.invoke(User, params.userID, function(userInstance) {
    return userInstance.postMessage(params.body, params.title, params.id);
  });
};

