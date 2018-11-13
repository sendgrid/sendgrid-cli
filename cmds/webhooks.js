require('dotenv').config();


exports.command = 'webhooks <command>';
exports.desc = 'Manage webhooks';
exports.builder = function (yargs) {
  return yargs.commandDir('webhooks_cmds');
};
exports.handler = function (argv) {};