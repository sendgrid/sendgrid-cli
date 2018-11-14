require('dotenv').config();
// const debug = require('debug')('sg:contacts');


exports.command = 'contacts <command>';
exports.desc = 'Manage contacts';
exports.builder = function (yargs) {
  return yargs.commandDir('contact_cmds');
};
// exports.handler = function (argv) {};