import { ethers } from 'hardhat';
import { BigNumber, providers } from 'ethers';
import { ERC721TA } from '../../types';
import { JsonRpcProvider, inisrizeERC721TA } from '../../lib/contractUtil';

export async function mintTo(tokenId: number) {
  const [deployer, user1] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const token: ERC721TA = await inisrizeERC721TA();
  const estimateGas: BigNumber = await token
    .connect(user1)
    .estimateGas.transferFrom(tokenId.toString(), await user1.getAddress(), await deployer.getAddress());
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
    gasPrice: ((await JsonRpcProvider.getGasPrice()).mul(2)),
  };
  const transaction: providers.TransactionResponse = await token
    .connect(user1)
    .transferFrom(tokenId.toString(), await user1.getAddress(), await deployer.getAddress(), options);
  await transaction.wait();

  console.log(transaction);
}

const tokenId = 1;

mintTo(tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
