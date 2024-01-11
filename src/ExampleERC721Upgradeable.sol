// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "operator-filter-registry/src/upgradeable/DefaultOperatorFiltererUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

contract ExampleERC721Upgradeable is
	ERC721Upgradeable,
	ERC2981Upgradeable,
	DefaultOperatorFiltererUpgradeable,
	AccessControlUpgradeable,
	ReentrancyGuardUpgradeable
{
	using CountersUpgradeable for CountersUpgradeable.Counter;
	CountersUpgradeable.Counter private _tokenIdCounter;
	mapping(uint256 => string) private uri;

	IERC20Upgradeable public purchaseToken;
	uint256 public tokenPrice;

	bytes32 public constant MINTER_ROLE =
		keccak256("MINTER_ROLE");

	function initialize(
		string memory _name,
		string memory _symbol,
		address _defaultAdmin,
		address _royaltyReceiver,
		uint96 _royaltyFeeNumerator,
		address _purchaseToken,
		uint256 _tokenPrice
	) public initializer {
		__AccessControl_init();
		__ReentrancyGuard_init();
		__ERC721_init(_name, _symbol);
		__ERC2981_init();
		__DefaultOperatorFilterer_init();

		_setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
		_setupRole(MINTER_ROLE, _defaultAdmin);
		setDefaultRoyalty(
			_royaltyReceiver,
			_royaltyFeeNumerator
		);
		purchaseToken = IERC20Upgradeable(_purchaseToken);
		tokenPrice = _tokenPrice;
	}

	function setDefaultRoyalty(
		address receiver,
		uint96 feeNumerator
	) public onlyRole(DEFAULT_ADMIN_ROLE) {
		_setDefaultRoyalty(receiver, feeNumerator);
	}

	function setApprovalForAll(
		address operator,
		bool approved
	) public override onlyAllowedOperatorApproval(operator) {
		super.setApprovalForAll(operator, approved);
	}

	function approve(
		address operator,
		uint256 tokenId
	) public override onlyAllowedOperatorApproval(operator) {
		super.approve(operator, tokenId);
	}

	function transferFrom(
		address from,
		address to,
		uint256 tokenId
	) public override onlyAllowedOperator(from) {
		super.transferFrom(from, to, tokenId);
	}

	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId
	) public override onlyAllowedOperator(from) {
		super.safeTransferFrom(from, to, tokenId);
	}

	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId,
		bytes memory data
	) public override onlyAllowedOperator(from) {
		super.safeTransferFrom(from, to, tokenId, data);
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
		string calldata _newUri
	) external onlyRole(MINTER_ROLE) {
		uri[_tokenId] = _newUri;
	}

	function supportsInterface(
		bytes4 interfaceId
	)
		public
		view
		virtual
		override(
			AccessControlUpgradeable,
			ERC2981Upgradeable,
			ERC721Upgradeable
		)
		returns (bool)
	{
		return
			super.supportsInterface(interfaceId) ||
			interfaceId == type(IERC2981Upgradeable).interfaceId;
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

	function purchase(string calldata _uri) external {
		require(
			purchaseToken.transferFrom(
				msg.sender,
				address(this),
				tokenPrice
			),
			"Payment failed"
		);
		_mint(_uri);
	}

	function withdraw()
		public
		onlyRole(DEFAULT_ADMIN_ROLE)
		nonReentrant
	{
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
	}

	function withdrawERC20Tokens()
		public
		onlyRole(DEFAULT_ADMIN_ROLE)
	{
		uint256 balance = purchaseToken.balanceOf(address(this));
		require(
			purchaseToken.transfer(msg.sender, balance),
			"Transfer failed"
		);
	}
}
