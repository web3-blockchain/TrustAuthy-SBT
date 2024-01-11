import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { ExampleFullOnchainSBTUpgradeable } from '../../types';
import { inisrizeExampleFullOnchainSBTUpgradeable } from '../../lib/contractUtil';

export async function mintTo(tokenId: number) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const token: ExampleFullOnchainSBTUpgradeable =
    await inisrizeExampleFullOnchainSBTUpgradeable();
  const estimateGas: BigNumber = await token
    .connect(deployer)
    .estimateGas.burn(tokenId);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await token
    .connect(deployer)
    .burn(tokenId, options);
  await transaction.wait();

  console.log(transaction);
}

const tokenId = 1;

mintTo(tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
