// const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const listTokens = require('../cmds/list-tokens');

chai.use(chaiAsPromised)
let expect = chai.expect

describe('list tokens tests', function () {

  it('lists tokens ', function () {
    listTokens.handler().then(function(data) {
      expect(data).to.have.property('result');
    }).catch(function (e) {
      console.error(e);
    })
  });
});