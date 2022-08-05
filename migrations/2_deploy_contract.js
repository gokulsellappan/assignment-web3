const Token = artifacts.require("Token");

module.exports = async  function (deployer) {
  //token contract deploy
  await deployer.deploy(Token);
  const token=await Token.deployed();
};
