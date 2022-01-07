const { ethers } = require("hardhat");

describe("Market", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftAddress = nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ether");

    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");

    await market.createMarketItem(nftAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    // ? first address _ is the seller
    const [, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftAddress, 1, { value: auctionPrice });

    let items = await market.fetchMarketItems();
    items = await Promise.all(
      items.map(async (item) => {
        const tokenUri = await nft.tokenURI(item.tokenId);

        return {
          tokenUri: tokenUri.toString(),
          price: item.price.toString(),
          tokenId: item.tokenId.toString(),
          seller: item.seller,
          owner: item.owner,
          sold: item.sold,
        };
      })
    );

    console.log(items);
  });
});
