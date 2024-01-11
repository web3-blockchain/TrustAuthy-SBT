// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract ExampleSemiOnchainSBTUpgradeable is
	ERC721Upgradeable,
	AccessControlUpgradeable,
	ReentrancyGuardUpgradeable
{
	using CountersUpgradeable for CountersUpgradeable.Counter;
	CountersUpgradeable.Counter private _tokenIdCounter;

	mapping(uint256 => Metadata) public tokenMetadata;

	struct Metadata {
		string name;
		string description;
		string base64Image;
	}

	bytes32 public constant MINTER_ROLE =
		keccak256("MINTER_ROLE");

	function initialize(
		string memory _name,
		string memory _symbol,
		address _defaultAdmin
	) public initializer {
		__AccessControl_init();
		__ReentrancyGuard_init();
		__ERC721_init(_name, _symbol);

		_setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
		_setupRole(MINTER_ROLE, _defaultAdmin);
	}

	function mintTo(
		address _to,
		string calldata _name,
		string calldata _description,
		string calldata _base64Image
	) external onlyRole(MINTER_ROLE) {
		_mintTo(_to, _name, _description, _base64Image);
	}

	function _mintTo(
		address _to,
		string calldata _name,
		string calldata _description,
		string calldata _base64Image
	) internal returns (uint256 tokenId) {
		_tokenIdCounter.increment();
		tokenId = _tokenIdCounter.current();

		tokenMetadata[tokenId] = Metadata({
			name: _name,
			description: _description,
			base64Image: _base64Image
		});

		_safeMint(_to, tokenId);
	}

	function tokenURI(
		uint256 _tokenId
	) public view override returns (string memory) {
		require(
			_exists(_tokenId),
			"URI query for nonexistent token"
		);

		Metadata memory meta = tokenMetadata[_tokenId];
		return
			string(
				abi.encodePacked(
					'data:application/json,{"name":"',
					meta.name,
					'","description":"',
					meta.description,
					'","image":"data:image/png;base64,',
					meta.base64Image,
					'"}'
				)
			);
	}

	function supportsInterface(
		bytes4 interfaceId
	)
		public
		view
		virtual
		override(ERC721Upgradeable, AccessControlUpgradeable)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}

	function withdraw()
		public
		onlyRole(DEFAULT_ADMIN_ROLE)
		nonReentrant
	{
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 firstTokenId,
		uint256 batchSize
	) internal override(ERC721Upgradeable) {
		if (from != address(0) && to != address(0)) {
			require(
				from == address(0),
				"Tokens cannot be transferred"
			);
		}

		super._beforeTokenTransfer(
			from,
			to,
			firstTokenId,
			batchSize
		);
	}

	function burn(uint256 tokenId) public {
		require(
			_isApprovedOrOwner(msg.sender, tokenId) ||
				hasRole(MINTER_ROLE, msg.sender),
			"Caller is not owner nor approved"
		);
		_burn(tokenId);
		delete tokenMetadata[tokenId];
	}
}
