import { ethers } from 'hardhat';
import { env } from '../../lib/config';
import { BigNumber, providers } from 'ethers';
import { ExampleFullOnchainSBTUpgradeable } from '../../types';
import { inisrizeExampleFullOnchainSBTUpgradeable } from '../../lib/contractUtil';

export async function mintTo(
  to: string,
  name: string,
  description: string,
  base64Image: string,
) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const token: ExampleFullOnchainSBTUpgradeable =
    await inisrizeExampleFullOnchainSBTUpgradeable();
  const estimateGas: BigNumber = await token
    .connect(deployer)
    .estimateGas.mintTo(to, name, description, base64Image);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await token
    .connect(deployer)
    .mintTo(to, name, description, base64Image, options);
  await transaction.wait();

  console.log(transaction);
}

const to = env.USER1_ADDRESS;
const name = 'Sample SBT';
const description = 'This is a sample description.';
const base64Image =
  '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';

mintTo(to, name, description, base64Image).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
