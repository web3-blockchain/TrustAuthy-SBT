import { ethers } from 'hardhat';
import { env } from '../../lib/config';
import { BigNumber, providers } from 'ethers';
import { ERC721TA } from '../../types';
import { JsonRpcProvider, inisrizeERC721TA } from '../../lib/contractUtil';

export async function main(tokenId: number, url: string) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const token: ERC721TA = await inisrizeERC721TA();
  const estimateGas: BigNumber = await token
    .connect(deployer)
    .estimateGas.setTokenURI(tokenId, url);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: (await JsonRpcProvider.getGasPrice()).mul(2),
  };
  const transaction: providers.TransactionResponse = await token
    .connect(deployer)
    .setTokenURI(tokenId, url, options);
  await transaction.wait();

  console.log(transaction);
}

const tokenId = 6;
const url =
  'https://trust-authy-api.vercel.app/metadata/sbt.json';

  main(tokenId, url).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
