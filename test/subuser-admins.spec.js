// const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const subuserAdmins = require('../cmds/subuser-admins');

chai.use(chaiAsPromised)
let expect = chai.expect

describe('subuser admins tests', function () {

  it('getSubusers ', function () {

    return expect(subuserAdmins.subusersProto.getSubusers()).is.fulfilled;

  });

  it('getTeammatesForSubuser ', function () {

    return expect(subuserAdmins.subusersProto.getTeammatesForSubuser('dummy_user1')).to.eventually.have.property('result');
    
  });

});