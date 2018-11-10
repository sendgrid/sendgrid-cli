require('dotenv').config();
const debug = require('debug')('sg-list-tokens'),
  client = require('@sendgrid/client');
  client.setApiKey(process.env.SENDGRID_API_KEY);

exports.command = 'list'
exports.desc = 'List tokens'
exports.builder = {}

const listProto = {
  listTokens: function (argv) {
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
        console.log(response.statusCode);
        console.log(response.body);
      })
  }
}

exports.handler = listProto.listTokens

