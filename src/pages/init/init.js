import { seed } from "@33cn/wallet-base";

class WalletBuilder {
  constructor() {}
  getNewMnemonic(lang) {
    if (lang === 1) {
      return seed.newMnemonicInCN();
    } else {
      return seed.newMnemonicInEN();
    }
  }
  createWallet(mnemonic) {
    const wallet = seed.newWalletFromMnemonic(mnemonic);
    return wallet;
  }
  createAccount(wallet, name) {
    const account = wallet.newAccount(name);
    return account;
  }
}

export default WalletBuilder;
