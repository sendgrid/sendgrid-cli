require('dotenv').config();
const debug = require('debug')('sg:client'),
  client = require('@sendgrid/client'),
  csv = require('csvtojson');

client.setApiKey(process.env.SENDGRID_API_KEY);

const requestProto = {
  makeRequest(config) {
    return new Promise (function (resolve, reject) {
      client.request(config)
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

const listProto = {
  listTokens: function () {
    debug('list tokens');
    const options = {};
    options.method = 'GET';
    options.url = '/v3/api_keys';
    return requestProto.makeRequest(options);
  }
};

const subusersProto = {
  getSubusers: function () {
    // const queryParams = {
    //   'limit': 1, 
    //   'offset': 1, 
    //   'username': 'dummy_user1'
    // };
    const options = {};
    // options.qs = queryParams;
    options.method = 'GET';
    options.url = '/v3/subusers';
    return requestProto.makeRequest(options);
  },
  getTeammatesForSubuser: function (subuser) {
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
    return requestProto.makeRequest(options);
  }
};

const contactsProto = {
  uploadContacts: function uploadContacts(contacts) {
    const options = {};
    options.body = contacts;
    options.method = 'POST';
    options.url = '/v3/contactdb/recipients';
    return requestProto.makeRequest(options);
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

const webhooksProto = {
  createParseWebhook: function createParseWebhook (webhookObj) {
    const options = {};
    options.body = webhookObj;
    debug('Body object:', options.body);
    options.method = 'POST';
    options.url = '/v3/user/webhooks/parse/settings';
    return requestProto.makeRequest(options);
  },
  enableEventWebhook: function enableEventWebhook (webhookObj) {
    const options = {};
    options.body = webhookObj;
    debug('Body object:', options.body);
    options.method = 'PATCH';
    options.url = '/v3/user/webhooks/event/settings';
    return requestProto.makeRequest(options);
  },
  disableEventWebhook: function disableEventWebhook (webhookObj) {
    const options = {};
    options.body = webhookObj;
    debug('Body object:', options.body);
    options.method = 'PATCH';
    options.url = '/v3/user/webhooks/event/settings';
    return requestProto.makeRequest(options);
  },
  listEventWebhook: function listEventWebhook () {
    const options = {};
    options.method = 'GET';
    options.url = '/v3/user/webhooks/event/settings';
    return requestProto.makeRequest(options);
  }
};

module.exports = {
  listProto: listProto,
  subusersProto: subusersProto,
  contactsProto: contactsProto,
  webhooksProto: webhooksProto
};