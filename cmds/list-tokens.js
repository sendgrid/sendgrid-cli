require('dotenv').config();
const debug = require('debug')('sg-list-tokens'),
  sgClient = require('../lib/sgclient'),
  client = sgClient.clientProto.createClient();

exports.command = 'list'
exports.desc = 'List tokens'
exports.builder = {}

const listProto = {
  listTokens: function (argv) {
    return new Promise(function(resolve, reject) {
      console.log('list tokens')
      const options = {}
      const queryParams = {
        'limit': 1
      };
        options.qs = queryParams;
        options.method = 'GET';
        options.url = '/v3/api_keys';
        client.request(options)
        .then(([response, body]) => {
          // Can do this for piping
          // process.stdout.write(JSON.stringify(body));
          console.log(body);
          resolve(body);
        });
    })
  }
}

exports.handler = listProto.listTokens

