import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { ExampleERC721Upgradeable } from '../../types';
import { inisrizeExampleERC721Upgradeable } from '../../lib/contractUtil';

export async function mintTo(tokenId: number) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: ExampleERC721Upgradeable =
    await inisrizeExampleERC721Upgradeable();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.burn(tokenId);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
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
