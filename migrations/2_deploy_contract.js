const HashLibrary = artifacts.require("CentralStorage");

module.exports = function(deployer) {
  deployer.deploy(HashLibrary);
};
