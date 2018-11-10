// const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const subuserAdmins = require('../cmds/subuser-admins');

chai.use(chaiAsPromised)
let expect = chai.expect

describe('subuser admins tests', function () {

  it('getSubusers ', function () {
    subuserAdmins.subusersProto.getSubusers().then(function(data) {
      expect(data).to.have.property('result');
    }).catch(function (e) {
      console.error(e);
    })
  });

  it('getTeammatesForSubuser ', function () {
    subuserAdmins.subusersProto.getTeammatesForSubuser('dummy_user1').then(function(data) {
      expect(data).to.have.property('result');
    }).catch(function (e) {
      console.error(e);
    })
  });

});