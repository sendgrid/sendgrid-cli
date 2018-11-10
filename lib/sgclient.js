require('dotenv').config();
const debug = require('debug')('sg-client'),
  client = require('@sendgrid/client');


const clientProto = {
  createClient: function createClient() {
    client.setApiKey(process.env.SENDGRID_API_KEY);
    return client;
  }
}

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
          // console.log(body);
          resolve(body);
        });
    })
  }
}

module.exports = {
  clientProto: clientProto,
  listProto: listProto
}