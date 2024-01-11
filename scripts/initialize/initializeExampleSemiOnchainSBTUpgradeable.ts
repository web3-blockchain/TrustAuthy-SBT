import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { ExampleSemiOnchainSBTUpgradeable } from '../../types';
import { inisrizeExampleSemiOnchainSBTUpgradeable } from '../../lib/contractUtil';
import { env } from '../../lib/config';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const address = await deployer.getAddress();

  const sbt: ExampleSemiOnchainSBTUpgradeable =
    await inisrizeExampleSemiOnchainSBTUpgradeable();
  const estimateGas: BigNumber = await sbt
    .connect(deployer)
    .estimateGas.initialize('TE', 'TE', address);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };

  const transaction: providers.TransactionResponse = await sbt
    .connect(deployer)
    .initialize('TE', 'TE', address, options);
  await transaction.wait();

  console.log(transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
