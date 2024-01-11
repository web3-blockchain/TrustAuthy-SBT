import { ethers } from 'hardhat';
import { env } from '../../lib/config';
import { BigNumber, providers } from 'ethers';
import { ExampleERC721Upgradeable } from '../../types';
import { inisrizeExampleERC721Upgradeable } from '../../lib/contractUtil';

export async function mintTo(to: string, url: string) {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const erc721: ExampleERC721Upgradeable =
    await inisrizeExampleERC721Upgradeable();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.mintTo(to, url);
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .mintTo(to, url, options);
  await transaction.wait();

  console.log(transaction);
}

const to = env.USER1_ADDRESS;
const url =
  'https://trust-authy-api.vercel.app/metadata/sbt.json03';

mintTo(to, url).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
