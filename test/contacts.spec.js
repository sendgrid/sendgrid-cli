const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const client = require('../lib/sgclient');
const utils = require('../lib/utils');

chai.use(chaiAsPromised)
let expect = chai.expect


describe('contacts tests', function () {

  it.only('uploads contacts', function () {
    const contacts = utils.utilsProto.generateEmails(10, 'aroach', 'ashleyroach.com');
    return expect(client.contactsProto.uploadContacts(contacts)).to.eventually.have.property('new_count');
  });

  // it('uploads contacts from a CSV file', function () {
  //   return expect(client.contactsProto.uploadContactsFile(file))
  // });

  // it('uploads contacts from pipe', function () {
  //   return expect(client.contactsProto.uploadContactsPipe(data))
  // });

});