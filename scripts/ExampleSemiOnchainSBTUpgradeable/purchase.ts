import { ethers } from 'hardhat';
import { env } from '../../lib/config';
import { BigNumber, providers } from 'ethers';
import { ERC721TA } from '../../types';
import { inisrizeERC721TA } from '../../lib/contractUtil';

export async function main(url: string) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const token: ERC721TA = await inisrizeERC721TA();
  const estimateGas: BigNumber = await token
    .connect(deployer)
    .estimateGas.purchase(url);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await token
    .connect(deployer)
    .purchase(url, options);
  await transaction.wait();

  console.log(transaction);
}

const url =
  'https://trust-authy-api.vercel.app/metadata/sbt.json03';

main(url).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
