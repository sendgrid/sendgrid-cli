// const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const client = require('../lib/sgclient');

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('list tokens tests', function () {

  it('lists tokens ', function () {
    return expect(client.listProto.listTokens()).to.eventually.have.property('result');
  });
});