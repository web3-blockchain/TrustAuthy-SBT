## setup

```
npx hardhat compile
```

## start node

```
anvil --fork-url $RPC_URL
```

## deploy

```
npx hardhat run --network mumbai scripts/deploy/deployExampleERC721Upgradeable.ts
npx hardhat run --network mumbai scripts/initialize/initializeExampleERC721Upgradeable.ts
```

```
npx hardhat run --network mumbai scripts/ExampleERC721Upgradeable/mintTo.ts
npx hardhat run --network mumbai scripts/ExampleERC721Upgradeable/transferFrom.ts
npx hardhat run --network mumbai scripts/ExampleERC721Upgradeable/burn.ts
```

metadata

```
https://trust-authy-api.vercel.app/metadata/sbt.json
```
