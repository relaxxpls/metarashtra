const fs = require('fs');

const { ethers } = require('hardhat');

const main = async () => {
  const MetaYoddha = await ethers.getContractFactory('MetaYoddha');
  const yoddha = await MetaYoddha.deploy();
  console.log('MetaYoddha deployed to:', yoddha.address);

  const KanakaToken = await ethers.getContractFactory('KanakaToken');
  const kanaka = await KanakaToken.deploy();
  console.log('KanakaToken deployed to:', kanaka.address);

  const addresses = {
    MetaYoddhaAddress: yoddha.address,
    KanakaTokenAddress: kanaka.address,
  };
  fs.writeFileSync('address.json', JSON.stringify(addresses));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
