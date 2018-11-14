require('dotenv').config();


exports.command = 'webhooks <command>';
exports.desc = 'Manage Event and Inbound Parse webhooks';
exports.builder = function (yargs) {
  return yargs.commandDir('webhooks_cmds');
};
exports.handler = function () {};