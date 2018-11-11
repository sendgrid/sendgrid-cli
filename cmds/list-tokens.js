require('dotenv').config();
const debug = require('debug')('sg:list-tokens'),
  sgClient = require('../lib/sgclient');

exports.command = 'list-tokens'
exports.desc = 'List tokens'
exports.builder = {}

function listTokens () {
  sgClient.listProto.listTokens().then(function (tokens) {
    console.log(tokens);
  });
}


exports.handler = listTokens

