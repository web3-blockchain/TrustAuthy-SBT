// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./ExampleERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ERC721TokenFactoryUpgradeable is
	UUPSUpgradeable,
	OwnableUpgradeable
{
	address private _logic;

	event TokenDeployed(
		address indexed tokenAddress,
		string name,
		string symbol
	);

	function initialize(address logic_) external initializer {
		__Ownable_init();
		_logic = logic_;
	}

	function _authorizeUpgrade(
		address newImplementation
	) internal override onlyOwner {}

	function setLogic(address newLogic) external onlyOwner {
		_logic = newLogic;
	}

	function createERC721Token(
		string memory name,
		string memory symbol,
		address defaultAdmin,
		address royaltyReceiver,
		uint96 royaltyFeeNumerator
	) external returns (address) {
		bytes memory initData = abi.encodeWithSelector(
			ExampleERC721Upgradeable.initialize.selector,
			name,
			symbol,
			defaultAdmin,
			royaltyReceiver,
			royaltyFeeNumerator
		);

		address proxy = address(
			new ERC1967Proxy(_logic, initData)
		);

		emit TokenDeployed(proxy, name, symbol);

		return proxy;
	}
}
