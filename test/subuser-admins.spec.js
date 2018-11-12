// const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const client = require('../lib/sgclient');

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('subuser admins tests', function () {

  it('getSubusers ', function () {

    return expect(client.subusersProto.getSubusers()).is.fulfilled;

  });

  it('getTeammatesForSubuser ', function () {

    return expect(client.subusersProto.getTeammatesForSubuser('dummy_user1')).to.eventually.have.property('result');
    
  });

});