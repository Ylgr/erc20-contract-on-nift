const Store = artifacts.require("Store");
const Token = artifacts.require("Token");
const Factory = artifacts.require("Factory");
require('dotenv').config()

module.exports = function (deployer) {
  deployer.deploy(Store);
  deployer.deploy(Token, "Test Token", "TTT", process.env.ADDRESS)
  deployer.deploy(Factory);
};
