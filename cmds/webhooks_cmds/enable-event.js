require('dotenv').config();
const debug = require('debug')('sg:webhooks-enable-event'),
  client = require('../../lib/sgclient');

exports.command = 'add-all-events <url>';
exports.desc = 'Enable and configure event webhook';
exports.builder = {};
exports.handler = function (argv) {
  const webhookOpts = {};
  webhookOpts.url = argv.url;
  webhookOpts.enabled = true;
  webhookOpts.group_resubscribe = true;
  webhookOpts.delivered = true;
  webhookOpts.group_unsubscribe = true;
  webhookOpts.spam_report = true;
  webhookOpts.bounce = true;
  webhookOpts.deferred = true;
  webhookOpts.unsubscribe = true;
  webhookOpts.processed = true;
  webhookOpts.open = true;
  webhookOpts.click = true;
  webhookOpts.dropped = true;

  debug('Event webhook options', webhookOpts);

  client.webhooksProto.enableEventWebhook(webhookOpts).then(function (result) {
    console.log(result);
  }).catch(function (e) {
    console.log(e.response.body);
  });
};