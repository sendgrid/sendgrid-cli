require('dotenv').config();
const debug = require('debug')('sg:webhooks-add-parse'),
  client = require('../../lib/sgclient');

exports.command = 'list-events';
exports.desc = 'Show event webhook settings';
exports.builder = {};
exports.handler = function (argv) {
  const webhookOpts = {};
  webhookOpts.enabled = false;

  debug('Event webhook options', webhookOpts);

  client.webhooksProto.listEventWebhook(webhookOpts).then(function (result) {
    console.log(result);
  }).catch(function (e) {
    console.log(e.response.body);
  });
};