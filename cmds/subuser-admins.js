require('dotenv').config()
const debug = require('debug')('sg-subuser-admins')

// So they'll want to:

// 1. Get all Subusers
// 2. For each subuser: (on-behalf-of: username)
//    3. Get all Teammates
//    4. Store that info somewhere


const proto = {
  something: function (argv) {
    console.log('subuser admins')
  }
}

exports.command = 'subuser-admins'
exports.desc = 'Get all subuser teammate admin'
exports.builder = {}
exports.handler = proto.something