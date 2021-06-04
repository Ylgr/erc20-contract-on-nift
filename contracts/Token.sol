// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(string memory name, string memory symbol, address initAddress) ERC20(name, symbol) {
        _mint(initAddress,1000000000000 * 1e18);
    }
}