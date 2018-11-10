require('dotenv').config()
const debug = require('debug')('sg-subuser-admins'),
  sgClient = require('../lib/sgclient'),
  client = sgClient.clientProto.createClient();

// So they'll want to:

// 1. Get all Subusers
// 2. For each subuser: (on-behalf-of: username)
//    3. Get all Teammates
//    4. Store that info somewhere


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
        console.log(response.statusCode);
        console.log(response.body);
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
        console.log(response.statusCode);
        console.log(response.body);
        resolve(body);
      });
    });
  }
}

function processSubusers () {
  subusersProto.getSubusers().then(function (subusers) {
    for (const key of Object.keys(subusers)) {
      // console.log(key, subusers[key]);
      // console.log("username", subusers[key].username);
      subusersProto.getTeammatesForSubuser(subusers[key].username).then(function (result) {

      });
    }
  }).catch(function (e) {
    console.error(e);
  });
}


exports.command = 'subuser-admins'
exports.desc = 'Get all subuser teammate admin'
exports.builder = {}
exports.handler = processSubusers

exports.subusersProto = subusersProto