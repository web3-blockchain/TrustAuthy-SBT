import { ethers } from 'hardhat';
import { ERC721TA } from '../../types';
import { inisrizeERC721TA } from '../../lib/contractUtil';

async function main(tokenId: number) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const token: ERC721TA = await inisrizeERC721TA();
  const response: string = await token.tokenURI(tokenId);

  console.log(response);
}

const tokenId = 1;

main(tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
