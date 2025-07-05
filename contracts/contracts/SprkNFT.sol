// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SparkNFT is ERC721Enumerable, Ownable {

    uint256 public maxSupply;
    uint256 public mintPrice;
    string private baseURI;

constructor(
    string memory _name,
    string memory _symbol,
    uint256 _maxSupply,
    uint256 _mintPrice,
    string memory _baseURI_,
    address initialOwner
) ERC721(_name, _symbol) Ownable(initialOwner) {
    maxSupply = _maxSupply;
    mintPrice = _mintPrice;
    baseURI = _baseURI_;
}

    function mint(address to, uint256 quantity) external payable {
        require(totalSupply() + quantity <= maxSupply, "Max supply exceeded");
        require(msg.value >= mintPrice * quantity, "Insufficient payment");

        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, totalSupply() + 1);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }
}