require('dotenv').config();
const debug = require('debug')('sg:utils');

const utilsProto = {
  // This generates email addresses
  generateEmails: function generateEmails (quantity, username, domain) {
    let i = 1,
      emails = [];

    while ( i <= quantity ) {
      
      let email = {};

      // build email address
      email.email = `${username}+${i}@${domain}`;

      emails.push(email);
      debug(emails);

      i += 1;
    }
    return emails;
  }
};

module.exports = {
  utilsProto: utilsProto
};