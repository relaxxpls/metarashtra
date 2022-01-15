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
  uint256 fee;

  mapping(uint256 => uint256) private _yoddhaLevel;

  struct Yoddha {
    uint256 id;
    string uri;
    uint256 level;
  }

  event YoddhaBorn(address indexed owner, uint256 id, string uri);
  event YoddhaUpgraded(uint256 indexed id, string indexed newLevel);
  event FeeUpdate(uint256 indexed fee);

  constructor() ERC721('MetaYoddha', 'YDH') {
    // ? start yoddha token id count from 1 instead of 0
    _yoddhaTokenIds.increment();
    updateFee(0.01 ether);
  }

  function mintYoddha(string memory tokenURI) public payable {
    require(msg.value >= fee);

    uint256 newYoddhaTokenId = _yoddhaTokenIds.current();
    _mint(msg.sender, newYoddhaTokenId);
    _setTokenURI(newYoddhaTokenId, tokenURI);
    _yoddhaLevel[newYoddhaTokenId] = 1;

    emit YoddhaBorn(msg.sender, newYoddhaTokenId, tokenURI);
    _yoddhaTokenIds.increment();
  }

  function getYoddhasByOwner(address _owner)
    external
    view
    returns (Yoddha[] memory)
  {
    Yoddha[] memory result = new Yoddha[](balanceOf(_owner));
    uint256 counter = 0;

    for (uint256 tokenId = 1; tokenId <= _yoddhaTokenIds.current(); tokenId++) {
      if (ownerOf(tokenId) == _owner) {
        result[counter] = Yoddha({
          id: tokenId,
          uri: tokenURI(tokenId),
          level: _yoddhaLevel[tokenId]
        });
        counter++;
      }
    }

    return result;
  }

  // ? Functions for owner (defaults to contract deployer)
  function updateFee(uint256 _fee) public onlyOwner {
    fee = _fee;
    emit FeeUpdate(_fee);
  }

  function levelUpYoddhaById(uint256 _yoddhaTokenId) external onlyOwner {
    _yoddhaLevel[_yoddhaTokenId]++;
  }

  function withdraw() external payable onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }
}
