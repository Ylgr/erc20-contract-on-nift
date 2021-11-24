// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token2 is ERC20 {
    constructor(string memory name, string memory symbol, address initAddress, uint256 amount) ERC20(name, symbol) {
        _mint(initAddress,amount * 1e18);
    }
}
