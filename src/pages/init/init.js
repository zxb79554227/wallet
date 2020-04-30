import {seed } from '@33cn/wallet-base'

class WalletBuilder{
    constructor(){}
    getNewMnemonic(lang){
        if(lang === 1){
            return seed.newMnemonicInCN()
        }else{
            return seed.newMnemonicInEN()
        }
    }
    createWallet(mnemonic){
        if(this.wallet){
            return this.wallet
        }else{
            const wallet =  seed.newWalletFromMnemonic(mnemonic)
        return wallet
     }
    }
    createAccount(name){
            if(this.account){
                return this.account
            }else{
                const account = this.wallet.newAccount(name);
                return account;
            }
    }
}

export default WalletBuilder
