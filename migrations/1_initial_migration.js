const Store = artifacts.require("Store");
const Token = artifacts.require("Token");
require('dotenv').config()

module.exports = function (deployer) {
  deployer.deploy(Store);
  deployer.deploy(Token, "Test Token", "TTT", process.env.ADDRESS)
};
