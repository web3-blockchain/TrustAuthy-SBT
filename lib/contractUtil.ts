import { providers } from 'ethers';
import axios from 'axios';

import { env } from './config';
import { ExampleERC721Upgradeable, ExampleERC721UpgradeableProxy, ExampleERC721UpgradeableProxy__factory, ExampleERC721Upgradeable__factory, ERC721TA, ERC721TAProxy, ERC721TAProxy__factory, ERC721TA__factory } from '../types';

export const JsonRpcProvider = new providers.JsonRpcProvider(env.NODE_URL);
export const StaticJsonRpcProvider = new providers.StaticJsonRpcProvider(
  env.NODE_URL,
);

export async function inisrizeExampleERC721Upgradeable(): Promise<ExampleERC721Upgradeable> {
  return await ExampleERC721Upgradeable__factory.connect(
    env.ERC1967PROXY_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function inisrizeExampleERC721UpgradeableProxy(): Promise<ExampleERC721UpgradeableProxy> {
  return await ExampleERC721UpgradeableProxy__factory.connect(
    env.ERC1967PROXY_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function inisrizeERC721TA(): Promise<ERC721TA> {
  return await ERC721TA__factory.connect(
    env.ERC1967PROXY_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function inisrizeERC721TAProxy(): Promise<ERC721TAProxy> {
  return await ERC721TAProxy__factory.connect(
    env.ERC1967PROXY_CONTRACT_ADDRESS,
    JsonRpcProvider,
  );
}

export async function getGasPrice() {
  const defultGasPrice: number = covertGweiToWei(50);

  try {
    const response = await (
      await axios.get(process.env.GET_GAS_FEE_URL || '')
    ).data;

    console.log('response = ', response);

    const result = covertGweiToWei(response.result.SafeGasPrice);
    console.log('result = ', result);

    if (defultGasPrice < result) {
      return defultGasPrice;
    }

    return result;
  } catch (error) {
    return defultGasPrice;
  }
}

function covertGweiToWei(amount: number): number {
  return Math.round(Number(amount) * 10 ** 9);
}

export async function isContract(address: string): Promise<boolean> {
  const code = await JsonRpcProvider.getCode(address);
  return code !== '0x';
}
