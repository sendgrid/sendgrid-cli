require('dotenv').config();
const client = require('../../lib/sgclient');

exports.command = 'list-events';
exports.desc = 'Show event webhook settings';
exports.builder = {};
exports.handler = function () {

  client.webhooksProto.listEventWebhook().then(function (result) {
    console.log(result);
  }).catch(function (e) {
    console.log(e.response.body);
  });
};