require('dotenv').config();
const debug = require('debug')('sg-client'),
  client = require('@sendgrid/client');


const clientProto = {
  createClient: function createClient() {
    client.setApiKey(process.env.SENDGRID_API_KEY);
    return client;
  }
}

module.exports = {
  clientProto: clientProto
}