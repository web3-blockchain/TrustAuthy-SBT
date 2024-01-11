# Solidity API

## ERC721TA

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### initialize

```solidity
function initialize(string _name, string _symbol, address _defaultAdmin) public
```

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
function setTokenURI(uint256 _tokenId, string newUri) external
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

### withdraw

```solidity
function withdraw() public
```

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal
```

_Hook that is called before any token transfer. This includes minting and burning. If {ERC721Consecutive} is
used, the hook may be called as part of a consecutive (batch) mint, as indicated by `batchSize` greater than 1.

Calling conditions:

- When `from` and `to` are both non-zero, ``from``'s tokens will be transferred to `to`.
- When `from` is zero, the tokens will be minted for `to`.
- When `to` is zero, ``from``'s tokens will be burned.
- `from` and `to` are never both zero.
- `batchSize` is non-zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]._

### burn

```solidity
function burn(uint256 tokenId) public
```

