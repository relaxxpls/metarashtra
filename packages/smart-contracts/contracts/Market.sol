// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Market Contract
 * @notice This contract is used to create a marketplace for the transfer/sale of NFTs.
 */
contract Market is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;

  address payable owner;
  uint256 listingPrice = 0.025 ether;

  constructor() {
    owner = payable(msg.sender);
  }

  struct MarketItem {
    uint256 itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => MarketItem) private idToMarketItem;

  event MarketItemCreated(
    uint256 indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  /**
   * @notice Adds an nft to the marketplace.
   */
  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price >= 0, "Price must be at least 1 wei");
    require(
      msg.value >= listingPrice,
      "Price must be greater than the listing price"
    );

    _itemIds.increment();
    uint256 itemId = _itemIds.current();

    idToMarketItem[itemId] = MarketItem(
      itemId,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price,
      false
    );

    ERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      itemId,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price,
      false
    );
  }

  function createMarketSale(address nftContract, uint256 itemId)
    public
    payable
    nonReentrant
  {
    uint256 price = idToMarketItem[itemId].price;
    uint256 tokenId = idToMarketItem[itemId].tokenId;
    require(msg.value == price, "Price must match listing price");

    idToMarketItem[itemId].seller.transfer(msg.value);
    ERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToMarketItem[itemId].owner = payable(msg.sender);
    idToMarketItem[itemId].sold = true;
    _itemsSold.increment();
    payable(owner).transfer(listingPrice);
  }

  // aka "fetchItemsOwnedByMarket"
  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint256 itemCount = _itemIds.current();
    uint256 unsoldItemCount = itemCount - _itemsSold.current();

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == address(0)) {
        uint256 currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex++;
      }
    }

    return items;
  }

  // aka "fetchItemsOwned"
  function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint256 itemCount = _itemIds.current();
    uint256 ownedCount = 0;

    for (uint256 i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        ownedCount++;
      }
    }

    MarketItem[] memory items = new MarketItem[](ownedCount);
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].owner == msg.sender) {
        uint256 currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex++;
      }
    }

    return items;
  }

  function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint256 itemCount = _itemIds.current();
    uint256 createdCount = 0;

    for (uint256 i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        createdCount++;
      }
    }

    MarketItem[] memory items = new MarketItem[](createdCount);
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].seller == msg.sender) {
        uint256 currentId = idToMarketItem[i + 1].itemId;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex++;
      }
    }

    return items;
  }
}
