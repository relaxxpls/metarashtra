// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC777 } from '@openzeppelin/contracts/token/ERC777/ERC777.sol';

contract SonanaToken is ERC777 {
  constructor(uint256 initialSupply, address[] memory defaultOperators)
    ERC777('Sonana', 'SONA', defaultOperators)
  {
    _mint(msg.sender, initialSupply, '', '');
  }
}
