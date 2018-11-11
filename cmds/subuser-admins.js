require('dotenv').config()
const debug = require('debug')('sg-subuser-admins'),
  sgClient = require('../lib/sgclient');

// So they'll want to:

// 1. Get all Subusers
// 2. For each subuser: (on-behalf-of: username)
//    3. Get all Teammates
//    4. Store that info somewhere


// Can do this for piping
// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// process.stdin.on('data', function(data) {
//   process.stdout.write(data);
// });
// process.stdin.on('end', function(data) {
//   console.log("Finished stdin");
// });

function processSubusers () {
  sgClient.subusersProto.getSubusers().then(function (subusers) {
    for (const key of Object.keys(subusers)) {
      debug(key, subusers[key]);
      debug("username", subusers[key].username);
      sgClient.subusersProto.getTeammatesForSubuser(subusers[key].username).then(function (result) {
        console.log(result.result);
      });
    }
  }).catch(function (e) {
    console.error(e);
  });
}


exports.command = 'subuser-admins'
exports.desc = 'Get all subusers\' teammates'
exports.builder = {}
exports.handler = processSubusers