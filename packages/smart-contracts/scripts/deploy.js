const fs = require('fs');

const { ethers } = require('hardhat');

const main = async () => {
  const MetaYoddha = await ethers.getContractFactory('MetaYoddha');
  const yoddha = await MetaYoddha.deploy();
  await yoddha.deployed();
  console.log('MetaYoddha deployed to:', yoddha.address);

  const MetaSonaToken = await ethers.getContractFactory('MetaSonaToken');
  const sonaToken = await MetaSonaToken.deploy();
  await sonaToken.deployed();
  console.log('MetaSonaToken deployed to:', sonaToken.address);

  const addresses = {
    MetaYoddhaAddress: yoddha.address,
    MetaSonaTokenAddress: sonaToken.address,
  };
  fs.writeFileSync('address.json', JSON.stringify(addresses));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
