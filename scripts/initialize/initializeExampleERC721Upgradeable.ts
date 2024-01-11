import { ethers } from 'hardhat';
import { BigNumber, providers, utils } from 'ethers';
import { ExampleERC721Upgradeable } from '../../types';
import { inisrizeExampleERC721Upgradeable } from '../../lib/contractUtil';
import { env } from '../../lib/config';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer address: ${await deployer.getAddress()}`);
  console.log(`deployer balance: ${await deployer.getBalance()}`);

  const address = await deployer.getAddress();

  const erc721: ExampleERC721Upgradeable =
    await inisrizeExampleERC721Upgradeable();
  const estimateGas: BigNumber = await erc721
    .connect(deployer)
    .estimateGas.initialize(
      'TE',
      'TE',
      address,
      address,
      '0',
      env.ERC1967PROXY_CONTRACT_ADDRESS,
      utils.parseEther('10000'),
    );
  const options: providers.TransactionRequest = {
    gasLimit: estimateGas,
  };

  const transaction: providers.TransactionResponse = await erc721
    .connect(deployer)
    .initialize(
      'TE',
      'TE',
      address,
      address,
      '0',
      env.ERC1967PROXY_CONTRACT_ADDRESS,
      utils.parseEther('10000'),
      options,
    );
  await transaction.wait();

  console.log(transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
