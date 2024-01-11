// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract ERC721TA is
	ERC721Upgradeable,
	AccessControlUpgradeable,
	ReentrancyGuardUpgradeable
{
	using CountersUpgradeable for CountersUpgradeable.Counter;
	CountersUpgradeable.Counter private _tokenIdCounter;
	mapping(uint256 => string) private uri;

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
		string calldata _uri
	) external onlyRole(MINTER_ROLE) {
		_mintTo(_to, _uri);
	}

	function mint(
		string calldata _uri
	) external onlyRole(MINTER_ROLE) {
		_mint(_uri);
	}

	function _mintTo(
		address _to,
		string calldata _uri
	) internal returns (uint256 tokenId) {
		_tokenIdCounter.increment();
		tokenId = _tokenIdCounter.current();

		require(bytes(_uri).length > 0, "empty uri.");
		uri[tokenId] = _uri;

		_safeMint(_to, tokenId);
	}

	function _mint(
		string calldata _uri
	) internal returns (uint256 tokenId) {
		_tokenIdCounter.increment();
		tokenId = _tokenIdCounter.current();

		require(bytes(_uri).length > 0, "empty uri.");
		uri[tokenId] = _uri;

		_safeMint(msg.sender, tokenId);
	}

	function tokenURI(
		uint256 _tokenId
	) public view override returns (string memory) {
		require(
			_exists(_tokenId),
			"URI query for nonexistent token"
		);
		return uri[_tokenId];
	}

	function setTokenURI(
		uint256 _tokenId,
		string calldata newUri
	) external onlyRole(MINTER_ROLE) {
		uri[_tokenId] = newUri;
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
		delete uri[tokenId];
	}
}
