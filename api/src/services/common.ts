import { Wallet, providers } from 'ethers';
import { PRIVATE_KEY, NODE_URL } from '../lib/constant';

export const JsonRpcProvider = new providers.JsonRpcProvider(NODE_URL);

export function initWallet() {
  return new Wallet(PRIVATE_KEY, JsonRpcProvider);
}
