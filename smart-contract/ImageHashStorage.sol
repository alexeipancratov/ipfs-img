// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ImageHashStorage {
    bytes private _imageHash;
    
    function setHash(bytes memory imageHash) external {
        _imageHash = imageHash;
    }
    
    function getHash() external view returns(bytes memory) {
        return _imageHash;
    }
}