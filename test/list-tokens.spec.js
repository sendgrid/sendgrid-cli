// const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const listTokens = require('../cmds/list-tokens');

chai.use(chaiAsPromised)
let expect = chai.expect

describe('list tokens tests', function () {

  it('lists tokens ', function () {
    return expect(listTokens.handler()).to.eventually.have.property('result');
  });
});