// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC721 } from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { ERC721URIStorage } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import { Counters } from '@openzeppelin/contracts/utils/Counters.sol';

// ? MetaYoddha - ERC721 Warrior NFT Character in MetaRashtra
contract MetaYoddha is Ownable, ERC721URIStorage {
  using Counters for Counters.Counter;

  // ? count of Yoddha nfts in circulation (1 based)
  Counters.Counter private _yoddhaTokenIds;
  uint256 internal fee = 0.01 ether;
  mapping(uint256 => uint256) private _yoddhaLevel;

  event YoddhaBorn(address indexed owner, uint256 id, string uri);
  event YoddhaUpgraded(uint256 indexed id, string indexed newLevel);

  constructor() ERC721('MetaYoddha', 'YDH') {}

  function mintYoddha(string memory tokenURI) public payable {
    require(msg.value >= fee);

    // ? start count from 1 instead of 0
    _yoddhaTokenIds.increment();
    uint256 newYoddhaTokenId = _yoddhaTokenIds.current();

    _mint(msg.sender, newYoddhaTokenId);
    _setTokenURI(newYoddhaTokenId, tokenURI);

    _yoddhaLevel[newYoddhaTokenId] = 1;

    emit YoddhaBorn(msg.sender, newYoddhaTokenId, tokenURI);
  }

  // ? Only the contract creater can upgrade the level of the Yoddha
  function levelUp(uint256 _yoddhaTokenId) external onlyOwner {
    _yoddhaLevel[_yoddhaTokenId]++;
  }
}
