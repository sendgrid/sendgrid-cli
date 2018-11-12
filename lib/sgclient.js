require('dotenv').config();
const debug = require('debug')('sg:client'),
  client = require('@sendgrid/client'),
  csv = require('csvtojson');

client.setApiKey(process.env.SENDGRID_API_KEY);

const listProto = {
  listTokens: function () {
    return new Promise (function (resolve, reject) {
      debug('list tokens');
      const options = {};
      const queryParams = {
        'limit': 1
      };
      options.qs = queryParams;
      options.method = 'GET';
      options.url = '/v3/api_keys';
      client.request(options)
        .then(([response, body]) => {
          debug(response.statusCode);
          debug(response.body);
          resolve(body);
        }).catch(function (e) {
          reject(e);
        });
    });
  }
};

const subusersProto = {
  getSubusers: function () {
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
          resolve(body);
        }).catch(function (e) {
          reject(e);
        });
    });
  },
  getTeammatesForSubuser: function (subuser) {
    return new Promise (function (resolve, reject) {
      const options = {};
      // needs basic auth
      // Lame!
      const basicCreds = `${process.env.SG_USERNAME}:${process.env.SG_PASSWORD}`;
      const creds = Buffer.from(basicCreds).toString('base64');
      options.headers = {
        'Authorization': 'Basic ' + creds,
        'On-Behalf-Of': subuser
      },
      options.method = 'GET';
      options.url = '/v3/teammates';
      client.request(options)
        .then(([response, body]) => {
          debug(response.statusCode);
          debug(response.body);
          resolve(body);
        }).catch(function (e) {
          reject(e);
        });
    });
  }
};

const contactsProto = {
  uploadContacts: function uploadContacts(contacts) {
    return new Promise (function (resolve, reject) {
      const options = {};
      options.body = contacts;
      options.method = 'POST';
      options.url = '/v3/contactdb/recipients';
      client.request(options)
        .then(([response, body]) => {
          debug(response.statusCode);
          debug(response.body);
          checkStatusCode(response.statusCode);
          resolve(body);
        }).catch(function (e) {
          reject(e);
        });
    });
  },
  readCsv: function readCsv (pathToFile) {
    return new Promise (function (resolve, reject) {
      const emails = [];
      const email = {};
      csv().fromFile(pathToFile).then(function(jsonObj) {
        jsonObj.map(function (value) {
          email.email = value.email;
          email.first_name = value.first_name;
          email.last_name = value.last_name;
          emails.push(email);
        });
        resolve(emails);
      }).catch(function (e) {
        reject(e);
      });
    });
  }
};

const checkStatusCode = function checkStatusCode (statusCode) {
  debug(`Status code: ${statusCode}`);
  if ( statusCode <= 200 && statusCode >= 400 ) {
    throw new Error(`API call failed with ${statusCode}`);
  }
};

module.exports = {
  listProto: listProto,
  subusersProto: subusersProto,
  contactsProto: contactsProto
};