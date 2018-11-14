require('dotenv').config();
const sgClient = require('../lib/sgclient');

exports.command = 'list-apikeys';
exports.desc = 'List API keys';
exports.builder = {};

function listTokens () {
  sgClient.listProto.listTokens().then(function (tokens) {
    console.log(tokens);
  });
}


exports.handler = listTokens;

