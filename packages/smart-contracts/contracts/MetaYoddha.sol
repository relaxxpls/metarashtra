// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC721 } from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { ERC721URIStorage } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import { Counters } from '@openzeppelin/contracts/utils/Counters.sol';

// ? MetaYoddha - ERC721 Warrior NFT Character in MetaRashtra
contract MetaYoddha is Ownable, ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _yoddhaTokenIds;
  uint256 public fee;

  mapping(uint256 => uint256) private _yoddhaLevels;

  struct Yoddha {
    uint256 id;
    string uri;
    uint256 level;
  }

  event YoddhaBorn(address indexed owner, uint256 id, string uri);
  event YoddhaUpgraded(uint256 indexed id, string indexed newLevel);
  event FeeUpdate(uint256 indexed fee);

  constructor() ERC721('MetaYoddha', 'YDH') {
    updateFee(0.01 ether);
  }

  function mint(string memory tokenURI) public payable {
    require(msg.value >= fee, 'MetaYoddha: Mint query for insufficient fee');

    // ? start yoddha token id count from 1 instead of 0
    _yoddhaTokenIds.increment();

    uint256 newYoddhaTokenId = _yoddhaTokenIds.current();
    _mint(msg.sender, newYoddhaTokenId);
    _setTokenURI(newYoddhaTokenId, tokenURI);
    _yoddhaLevels[newYoddhaTokenId] = 1;

    emit YoddhaBorn(msg.sender, newYoddhaTokenId, tokenURI);
  }

  function yoddhaLevel(uint256 tokenId) public view returns (uint256) {
    require(
      _exists(tokenId),
      'MetaYoddha: Level query for nonexistent tokenId'
    );

    return _yoddhaLevels[tokenId];
  }

  function getYoddhaById(uint256 tokenId)
    external
    view
    returns (Yoddha memory)
  {
    require(
      _exists(tokenId),
      'MetaYoddha: Yoddha query for nonexistent tokenId'
    );

    return Yoddha(tokenId, tokenURI(tokenId), yoddhaLevel(tokenId));
  }

  function getYoddhasByOwner(address owner)
    external
    view
    returns (Yoddha[] memory)
  {
    Yoddha[] memory result = new Yoddha[](balanceOf(owner));
    uint256 counter = 0;

    for (uint256 tokenId = 1; tokenId <= _yoddhaTokenIds.current(); tokenId++) {
      if (ownerOf(tokenId) == owner) {
        result[counter] = Yoddha({
          id: tokenId,
          uri: tokenURI(tokenId),
          level: _yoddhaLevels[tokenId]
        });
        counter++;
      }
    }

    return result;
  }

  function totalSupply() external view returns (uint256) {
    return _yoddhaTokenIds.current();
  }

  // ? Functions for owner (defaults to contract deployer)
  function updateFee(uint256 _fee) public onlyOwner {
    fee = _fee;
    emit FeeUpdate(_fee);
  }

  function upgradeYoddhaById(uint256 _yoddhaTokenId)
    external
    payable
    onlyOwner
  {
    require(
      _exists(_yoddhaTokenId),
      'MetaYoddha: Upgrade query for nonexistent tokenId'
    );
    require(
      msg.value >= fee,
      'MetaYoddha: Upgrade query with insufficient fee'
    );

    _yoddhaLevels[_yoddhaTokenId]++;
  }

  function withdraw() external payable onlyOwner {
    address payable owner = payable(owner());
    owner.transfer(address(this).balance);
  }
}
