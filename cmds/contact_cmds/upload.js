require('dotenv').config();
const debug = require('debug')('contacts-upload'),
  client = require('../../lib/sgclient');


exports.command = 'upload <file>'
exports.desc = 'Upload contacts from a CSV <file> (fields: email, first_name, last_name)'
exports.builder = {}
exports.handler = function (argv) {
  console.log('Uploading file %s', argv.file)
  client.contactsProto.readCsv(argv.file).then(function (jsonObj) {
    debug(jsonObj);
    client.contactsProto.uploadContacts(jsonObj).then(function (result) {
      console.log(`New contacts: ${result.new_count}`);
      if (result.errors) {
        console.error(`Error count ${result.error_count}`);
        result.errors.forEach(function (e) {
          console.error(`Reason: ${e.message}`);
        });
      }
    });
  });
}