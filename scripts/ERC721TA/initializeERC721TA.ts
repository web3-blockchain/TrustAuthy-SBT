import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { ERC721TA } from '../../types';
import { inisrizeERC721TA } from '../../lib/contractUtil';
import { env } from '../../lib/config';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const address = await deployer.getAddress();

  const sbt: ERC721TA = await inisrizeERC721TA();
  const estimateGas: BigNumber = await sbt
    .connect(deployer)
    .estimateGas.initialize('ERC721TA', 'TA', address);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };

  const transaction: providers.TransactionResponse = await sbt
    .connect(deployer)
    .initialize('ERC721TA', 'TA', address, options);
  await transaction.wait();

  console.log(transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
