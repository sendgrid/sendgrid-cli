const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const utils = require('../lib/utils');

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('utilities tests', function () {

  it('generates email array ', function () {
    const emails = utils.utilsProto.generateEmails(10, 'aroach', 'ashleyroach.com');
    expect(emails).to.have.lengthOf(10);
  });

});