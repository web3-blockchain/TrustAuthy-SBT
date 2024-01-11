import { ethers } from 'hardhat';
import { utils } from 'ethers';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);
  let options = {
    gasPrice: utils.parseUnits('100', 'gwei'),
  };

  const token = await (
    await ethers.getContractFactory('ExampleFullOnchainSBTUpgradeable')
  ).deploy(options);
  await token.deployed();

  console.log('token address: ', token.address);

  const proxy = await (
    await ethers.getContractFactory('ExampleFullOnchainSBTUpgradeableProxy')
  ).deploy(token.address, [], options);
  await proxy.deployed();

  console.log('proxy address: ', proxy.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
