require('dotenv').config();
const debug = require('debug')('sg:webhooks-add-parse'),
  client = require('../../lib/sgclient');

exports.command = 'disable-events';
exports.desc = 'Disable an event webhook';
exports.builder = {};
exports.handler = function (argv) {
  const webhookOpts = {};
  webhookOpts.enabled = false;

  debug('Event webhook options', webhookOpts);

  client.webhooksProto.disableEventWebhook(webhookOpts).then(function (result) {
    console.log(result);
  }).catch(function (e) {
    console.log(e.response.body);
  });
};