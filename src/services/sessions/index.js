'use strict';

const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');
var hooks = require('./hooks');
const url = require('../../../config/db.conf');

module.exports = function(){
  var app = this;
  //console.log(app)
  var hooks = require('./hooks');

  MongoClient.connect(url).then(function(db){
  // Connect to the db, create and register a Feathers service.
  app.use('/sessions', service({
    Model: db.collection('sessions'),
    paginate: {
      default: 500,
      max: 1000
    }
  }));

  // Get our initialize service to that we can bind hooks
  var sessionsService = app.service('/sessions');

  // Set up our before hooks
  sessionsService.before(hooks.before);

  // Set up our after hooks
  sessionsService.after(hooks.after);

  });
};