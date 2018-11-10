require('dotenv').config()
const debug = require('debug')('sg-list-tokens')

exports.command = 'list <name> [url]'
exports.desc = 'List tokens'
exports.builder = {}

const proto = {
  something: function (argv) {
    console.log('list tokens', argv.name, argv.url)
  }
}

exports.handler = proto.something

