const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const Market = await hre.ethers.getContractFactory("Market");
  const market = await Market.deploy();
  await market.deployed();
  console.log("Market deployed to:", market.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(Market.address);
  await nft.deployed();
  console.log("Market deployed to:", nft.address);

  const config = JSON.stringify(`
  export const marketaddress = "${market.address}";
  export const nftaddress = "${nft.address}";
  `);
  fs.writeFileSync("config.js", JSON.parse(config));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
