// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  constructor(address marketplaceAddress) ERC721("Color Tokens", "COLOR") {
    contractAddress = marketplaceAddress;
  }

  function createToken(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    setApprovalForAll(contractAddress, true);

    return newItemId;
  }

  // string[] public colors;
  // mapping(string => bool) _colorExists;
  // function _beforeTokenTransfer(
  //   address from,
  //   address to,
  //   uint256 tokenId
  // ) internal override(ERC721, ERC721Enumerable) {
  //   super._beforeTokenTransfer(from, to, tokenId);
  // }
  // function supportsInterface(bytes4 interfaceId)
  //   public
  //   view
  //   override(ERC721, ERC721Enumerable)
  //   returns (bool)
  // {
  //   return super.supportsInterface(interfaceId);
  // }

  // function mint(string memory _color) public {
  //   require(!_colorExists[_color], "Color already exists");
  //   colors.push(_color);
  //   uint256 _id = colors.length;
  //   _mint(msg.sender, _id);
  //   _colorExists[_color] = true;
  // }
}
