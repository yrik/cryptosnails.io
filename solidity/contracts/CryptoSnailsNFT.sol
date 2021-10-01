// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";



contract CryptoSnails is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _Ids;

    uint256 public MAX_SNAILS = 10000;
    uint256 public snailPrice = 50 ether;  // 50 matic

    string private baseURI = "ipfs://QmPc3B6YTVkpPNpnw1KPBdbVYU16wYaCuGKwuiwqEHiwtL/";
    
    bool public saleActive = false;


    constructor() ERC721("CryptoSnails", "SNAIL") {}

    function _baseURI()
        internal
        view
        virtual
        override(ERC721)
        returns (string memory)
    {
        return baseURI;
    }

    function setPrice(uint256 price) external onlyOwner {
        snailPrice = price;
    }
    
    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }    
    
    function toogleSale() public onlyOwner {
        saleActive = !saleActive;
    }

    function reserveSnails(uint256 snailsAmount) public onlyOwner {
        uint i;
        for (i = 0; i < snailsAmount; i++) {
            _Ids.increment();
            uint256 newItemId = _Ids.current();
            _safeMint(msg.sender, newItemId);
        }
    }

    function mint(uint256 snailsAmount) external payable {
        require(saleActive == true, "Sales are currently closed");
        require(totalSupply() < MAX_SNAILS, "Sold Out");
        require(snailsAmount > 0, "snailsAmount cannot be 0");
        require(snailsAmount <= 100, "You may not buy more than 100 Snails at once");
        require(totalSupply().add(snailsAmount) <= MAX_SNAILS, "Sale exceeds available Snails");
        uint256 purchasePrice = snailPrice.mul(snailsAmount);
        require(msg.value >= purchasePrice, "Insufficient Amount");

        for (uint i = 0; i < snailsAmount; i++) {
            _Ids.increment();
            uint256 newItemId = _Ids.current();
            _safeMint(msg.sender, newItemId);
        }
    }
    
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }    
    
    function tokensOfOwner(address owner)
        external
        view
        returns (string[] memory ownerTokens)
    {
        uint256 tokenCount = balanceOf(owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new string[](0);
        } else {
            string[] memory result = new string[](tokenCount);
            uint256 resultIndex = 0;
            uint256 Id;

            for (Id = 1; Id <= tokenCount; Id++) {
                result[resultIndex] = tokenURI((tokenOfOwnerByIndex(owner, Id - 1)));
                resultIndex++;
            }

            return result;
        }
    }    
}
