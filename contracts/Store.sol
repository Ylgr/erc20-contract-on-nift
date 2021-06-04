// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Store {
    string public value;

    function getValue() view public returns (string memory)  {
        return value;
    }

    function setValue(string memory _value) public {
        value = _value;
    }
}
