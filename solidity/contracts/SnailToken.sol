pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Snail is ERC20, Ownable {

    constructor() ERC20("Snail", "SNAIL") {
    }

    function mint(address to, uint amount) external onlyOwner {
      _mint(to, amount);
    }

    function burn(uint amount) external {
      _burn(msg.sender, amount);
    }
}
