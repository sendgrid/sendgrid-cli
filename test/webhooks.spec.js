const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const client = require('../lib/sgclient');
const nock = require('nock');

chai.use(chaiAsPromised);
let expect = chai.expect;


describe('webhook tests', function () {

  it('create inbound parse webhook', function () {
    // Mock the API to test for error case
    const options = {allowUnmocked: true};
    nock('https://api.sendgrid.com', options)
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

  it('creates event webhook', function () {
    // Mock the API to test for error case
    const options = {allowUnmocked: true};
    nock('https://api.sendgrid.com', options)
      .patch('/v3/user/webhooks/event/settings')
      .reply(200, {
        'enabled': true,
        'url': 'url',
        'group_resubscribe': true,
        'delivered': true,
        'group_unsubscribe': true,
        'spam_report': true,
        'bounce': true,
        'deferred': true,
        'unsubscribe': true,
        'processed': true,
        'open': true,
        'click': true,
        'dropped': true
      });

    const webhookOpts = {
      'enabled': true,
      'url': 'url',
      'group_resubscribe': true,
      'delivered': true,
      'group_unsubscribe': true,
      'spam_report': true,
      'bounce': true,
      'deferred': true,
      'unsubscribe': true,
      'processed': true,
      'open': true,
      'click': true,
      'dropped': true
    };

    return client.webhooksProto.enableEventWebhook(webhookOpts).then(function (result) {
      expect(result).to.have.property('enabled');
      expect(result).to.have.property('url');
      expect(result).to.have.property('group_resubscribe');
      expect(result).to.have.property('spam_report');
    });
  });

  it('disables event webhook', function () {
    // Mock the API to test for error case
    const options = {allowUnmocked: true};
    nock('https://api.sendgrid.com', options)
      .patch('/v3/user/webhooks/event/settings')
      .reply(200, {
        'enabled': true,
        'url': 'url',
        'group_resubscribe': true,
        'delivered': true,
        'group_unsubscribe': true,
        'spam_report': true,
        'bounce': true,
        'deferred': true,
        'unsubscribe': true,
        'processed': true,
        'open': true,
        'click': true,
        'dropped': true
      });

    const webhookOpts = {
      'enabled': true,
      'url': 'url',
      'group_resubscribe': true,
      'delivered': true,
      'group_unsubscribe': true,
      'spam_report': true,
      'bounce': true,
      'deferred': true,
      'unsubscribe': true,
      'processed': true,
      'open': true,
      'click': true,
      'dropped': true
    };

    return client.webhooksProto.disableEventWebhook(webhookOpts).then(function (result) {
      expect(result).to.have.property('enabled');
      expect(result).to.have.property('url');
      expect(result).to.have.property('group_resubscribe');
      expect(result).to.have.property('spam_report');
    });
  });

  it('displays the event webhook', function () {
    // Mock the API to test for error case
    const options = {allowUnmocked: true};
    nock('https://api.sendgrid.com', options)
      .get('/v3/user/webhooks/event/settings')
      .reply(200, {
        'enabled': true,
        'url': 'url',
        'group_resubscribe': true,
        'delivered': true,
        'group_unsubscribe': true,
        'spam_report': true,
        'bounce': true,
        'deferred': true,
        'unsubscribe': true,
        'processed': true,
        'open': true,
        'click': true,
        'dropped': true
      });

    const webhookOpts = {
      'enabled': true,
      'url': 'url',
      'group_resubscribe': true,
      'delivered': true,
      'group_unsubscribe': true,
      'spam_report': true,
      'bounce': true,
      'deferred': true,
      'unsubscribe': true,
      'processed': true,
      'open': true,
      'click': true,
      'dropped': true
    };

    return client.webhooksProto.listEventWebhook(webhookOpts).then(function (result) {
      expect(result).to.have.property('enabled');
      expect(result).to.have.property('url');
      expect(result).to.have.property('group_resubscribe');
      expect(result).to.have.property('spam_report');
    });
  });
});