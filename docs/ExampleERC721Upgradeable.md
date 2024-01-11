# Solidity API

## ExampleERC721Upgradeable

### purchaseToken

```solidity
contract IERC20Upgradeable purchaseToken
```

### tokenPrice

```solidity
uint256 tokenPrice
```

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### initialize

```solidity
function initialize(string _name, string _symbol, address _defaultAdmin, address _royaltyReceiver, uint96 _royaltyFeeNumerator, address _purchaseToken, uint256 _tokenPrice) public
```

### setDefaultRoyalty

```solidity
function setDefaultRoyalty(address receiver, uint96 feeNumerator) public
```

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool approved) public
```

_See {IERC721-setApprovalForAll}._

### approve

```solidity
function approve(address operator, uint256 tokenId) public
```

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) public
```

_See {IERC721-transferFrom}._

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) public
```

_See {IERC721-safeTransferFrom}._

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) public
```

_See {IERC721-safeTransferFrom}._

### mintTo

```solidity
function mintTo(address _to, string _uri) external
```

### mint

```solidity
function mint(string _uri) external
```

### _mintTo

```solidity
function _mintTo(address _to, string _uri) internal returns (uint256 tokenId)
```

### _mint

```solidity
function _mint(string _uri) internal returns (uint256 tokenId)
```

### tokenURI

```solidity
function tokenURI(uint256 _tokenId) public view returns (string)
```

### setTokenURI

```solidity
function setTokenURI(uint256 _tokenId, string _newUri) external
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

### burn

```solidity
function burn(uint256 tokenId) public
```

### purchase

```solidity
function purchase(string _uri) external
```

### withdraw

```solidity
function withdraw() public
```

### withdrawERC20Tokens

```solidity
function withdrawERC20Tokens() public
```

