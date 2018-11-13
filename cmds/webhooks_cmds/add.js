require('dotenv').config();
const debug = require('debug')('sg:webhooks-add-parse'),
  client = require('../../lib/sgclient');

exports.command = 'add-parse <hostname> <url> <spam_check> <send_raw>';
exports.desc = 'Add an inbound parse webhook (subdomain: e.g. parse.example.com) (url: sljdlf.ngrok.net)';
exports.builder = {};
exports.handler = function (argv) {
  const webhookOpts = {};
  webhookOpts.url = argv.url;
  webhookOpts.hostname = argv.hostname;
  webhookOpts.spam_check = argv.spam_check.toLowerCase() == 'true' ? true : false;
  webhookOpts.send_raw = argv.send_raw.toLowerCase() == 'true' ? true : false;
  debug('typeof spam_check', typeof webhookOpts.spam_check);
  debug('typeof send_raw', typeof webhookOpts.send_raw);

  client.webhooksProto.createParseWebhook(webhookOpts).then(function (result) {
    console.log(result);
  }).catch(function (e) {
    console.log(e.response.body);
  });
};