import { BigNumber, providers } from 'ethers';
import { ExampleERC721Upgradeable } from '../../../types';
import { inisrizeExampleERC721Upgradeable } from '../../../lib/contractUtil';
import { initWallet } from './common';

export async function mintTo(to: string, url: string) {
  const signer = initWallet();

  const erc721: ExampleERC721Upgradeable =
    await inisrizeExampleERC721Upgradeable();
  const estimateGas: BigNumber = await erc721
    .connect(signer)
    .estimateGas.mintTo(to, url);
  const options: providers.TransactionRequest = {
    gasPrice: await erc721.provider.getGasPrice(),
    gasLimit: estimateGas,
  };
  const transaction: providers.TransactionResponse = await erc721
    .connect(signer)
    .mintTo(to, url);
  await transaction.wait();

  return transaction;
}
