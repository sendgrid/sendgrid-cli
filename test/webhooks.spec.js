const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const client = require('../lib/sgclient');
const utils = require('../lib/utils');
const nock = require('nock');

chai.use(chaiAsPromised);
let expect = chai.expect;


describe('webhook tests', function () {

  it.only('create inbound parse webhook', function () {
    // Mock the API to test for error case
    const options = {allowUnmocked: true};
    let sgApi = nock('https://api.sendgrid.com', options)
      .post('/v3/user/webhooks/parse/settings')
      .reply(201, {
        'url': 'http://email.myhostname.com',
        'hostname': 'parse.myhostname.com',
        'spam_check': false,
        'send_raw': true
      });

    const webhookOpts = {
      url: 'http://email.myhostname.com',
      hostname: 'parse.myhostname.com',
      spam_check: false,
      send_raw: true
    };

    return client.webhooksProto.createParseWebhook(webhookOpts).then(function (result) {
      expect(result).to.have.property('url');
      expect(result).to.have.property('hostname');
      expect(result).to.have.property('spam_check');
      expect(result).to.have.property('send_raw');
    });
  });
});