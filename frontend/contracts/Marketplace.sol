// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _itemsCanceled;

    address payable public owner;
    uint256 public listingFee = 0.045 ether;

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        bool canceled;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        bool canceled
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    // List an NFT on the marketplace
    function createMarketItem(address nftContract, uint256 tokenId, uint256 price) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingFee, "Must pay listing fee");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false,
            false
        );
    }

    // Buy an NFT from the marketplace
    function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(!item.sold, "Item already sold");
        require(!item.canceled, "Item canceled");
        require(msg.value == item.price, "Please submit the asking price");

        item.owner = payable(msg.sender);
        item.sold = true;
        _itemsSold.increment();

        item.seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, item.tokenId);
        payable(owner).transfer(listingFee);
    }

    // Cancel a market item (only seller)
    function cancelMarketItem(address nftContract, uint256 itemId) public nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.seller == msg.sender, "You are not the seller");
        require(!item.sold, "Item already sold");
        require(!item.canceled, "Item already canceled");

        item.owner = payable(msg.sender);
        item.canceled = true;
        _itemsCanceled.increment();

        IERC721(nftContract).transferFrom(address(this), msg.sender, item.tokenId);
    }

    // Fetch all available (not sold, not canceled) items
    function fetchAvailableMarketItems() public view returns (MarketItem[] memory) {
        uint256 total = _itemIds.current();
        uint256 availableCount = total - _itemsSold.current() - _itemsCanceled.current();
        MarketItem[] memory items = new MarketItem[](availableCount);
        uint256 idx = 0;
        for (uint256 i = 1; i <= total; i++) {
            MarketItem storage item = idToMarketItem[i];
            if (!item.sold && !item.canceled) {
                items[idx] = item;
                idx++;
            }
        }
        return items;
    }

    // Fetch items listed by the caller
    function fetchSellingMarketItems() public view returns (MarketItem[] memory) {
        uint256 total = _itemIds.current();
        uint256 count = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].seller == msg.sender) count++;
        }
        MarketItem[] memory items = new MarketItem[](count);
        uint256 idx = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                items[idx] = idToMarketItem[i];
                idx++;
            }
        }
        return items;
    }

    // Fetch items owned by the caller
    function fetchOwnedMarketItems() public view returns (MarketItem[] memory) {
        uint256 total = _itemIds.current();
        uint256 count = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].owner == msg.sender) count++;
        }
        MarketItem[] memory items = new MarketItem[](count);
        uint256 idx = 0;
        for (uint256 i = 1; i <= total; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                items[idx] = idToMarketItem[i];
                idx++;
            }
        }
        return items;
    }
} 