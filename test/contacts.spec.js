const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const client = require('../lib/sgclient');
const utils = require('../lib/utils');
const nock = require('nock');

chai.use(chaiAsPromised);
let expect = chai.expect;


describe('contacts tests', function () {

  it('uploads contacts', function () {
    const contacts = utils.utilsProto.generateEmails(10, 'aroach', 'ashleyroach.com');
    return expect(client.contactsProto.uploadContacts(contacts)).to.eventually.have.property('new_count');
  });

  it('throws an error when a non 2xx/3xx', function () {
    // Mock the API to test for error case
    const options = {allowUnmocked: true};
    let sgApi = nock('https://api.sendgrid.com', options)
      .post('/v3/contactdb/recipients')
      .reply(400, 'error');

    const contacts = utils.utilsProto.generateEmails(10, 'aroach', 'ashleyroach.com');
    return client.contactsProto.uploadContacts(contacts).then(function (result) {
      expect(result).to.not.exist;
    }).catch(function (e) {
      // console.log(`======= ERROR ======== \n ${e}`);
      expect(e).to.exist;
    });
  });
  // it('uploads contacts from a CSV file', function () {
  //   return expect(client.contactsProto.uploadContactsFile(file))
  // });

  // it('uploads contacts from pipe', function () {
  //   return expect(client.contactsProto.uploadContactsPipe(data))
  // });

});