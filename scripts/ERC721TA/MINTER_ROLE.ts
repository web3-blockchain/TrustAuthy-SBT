import { ethers } from 'hardhat';
import { ERC721TA } from '../../types';
import { inisrizeERC721TA } from '../../lib/contractUtil';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const token: ERC721TA = await inisrizeERC721TA();
  const response: string = await token.MINTER_ROLE();

  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
