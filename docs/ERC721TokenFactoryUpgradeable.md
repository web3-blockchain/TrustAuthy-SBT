# Solidity API

## ERC721TokenFactoryUpgradeable

### TokenDeployed

```solidity
event TokenDeployed(address tokenAddress, string name, string symbol)
```

### initialize

```solidity
function initialize(address logic_) external
```

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal
```

_Function that should revert when `msg.sender` is not authorized to upgrade the contract. Called by
{upgradeTo} and {upgradeToAndCall}.

Normally, this function will use an xref:access.adoc[access control] modifier such as {Ownable-onlyOwner}.

```solidity
function _authorizeUpgrade(address) internal override onlyOwner {}
```_

### setLogic

```solidity
function setLogic(address newLogic) external
```

### createERC721Token

```solidity
function createERC721Token(string name, string symbol, address defaultAdmin, address royaltyReceiver, uint96 royaltyFeeNumerator) external returns (address)
```

