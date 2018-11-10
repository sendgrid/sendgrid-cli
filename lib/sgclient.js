require('dotenv').config();
const debug = require('debug')('sg-client'),
  client = require('@sendgrid/client');

  client.setApiKey(process.env.SENDGRID_API_KEY);

  const clientProto = {
  createClient: function createClient() {
    client.setApiKey(process.env.SENDGRID_API_KEY);
    return client;
  }
}

const listProto = {
  listTokens: function (argv) {
    return new Promise(function(resolve, reject) {
      debug('list tokens')
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

const subusersProto = {
  getSubusers: function (argv) {
    return new Promise (function (resolve, reject) {
      // const queryParams = {
      //   'limit': 1, 
      //   'offset': 1, 
      //   'username': 'dummy_user1'
      // };
      const options = {};
      // options.qs = queryParams;
      options.method = 'GET';
      options.url = '/v3/subusers';
      client.request(options)
      .then(([response, body]) => {
        debug(response.statusCode);
        debug(response.body);
        resolve(body)
      })
    });
  },
  getTeammatesForSubuser: function (subuser) {
    return new Promise (function (resolve, reject) {
      options = {};
      // needs basic auth
      // Lame!
      options.headers = {
        'Authorization': 'Basic ' + process.env.SG_BASIC_AUTH,
        'On-Behalf-Of': subuser
      },
      options.method = 'GET';
      options.url = '/v3/teammates';
      client.request(options)
      .then(([response, body]) => {
        debug(response.statusCode);
        debug(response.body);
        resolve(body);
      });
    });
  }
}

module.exports = {
  clientProto: clientProto,
  listProto: listProto,
  subusersProto: subusersProto
}