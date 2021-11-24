// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token2.sol";

contract Factory {
    event TokenCreated(address indexed tokenAddress, string name, string symbol);

    function createNewToken(
        string memory name,
        string memory symbol,
        uint256 amount
    ) external returns (address) {
        ERC20 token = new Token2(name, symbol, msg.sender,amount);
        emit TokenCreated(address(token), name, symbol);
        return address(token);
    }
}
