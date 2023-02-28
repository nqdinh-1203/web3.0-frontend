import { Contract, ethers } from "ethers";
import BaseInterface from "./BaseInterface";

class Erc20 extends BaseInterface {
    constructor(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider, address: string, abi: ethers.ContractInterface) {
        super(provider, address, abi);
    }

    async balanceOf(address: string): Promise<number> {
        const balance = await this._contract.balanceOf(address);
        return this._toNumber(balance);
    }

    async totalSupply(): Promise<number> {
        const total = await this._contract.totalSupply();
        return this._toNumber(total);
    }

    async owner(): Promise<string> {
        return this._contract.owner();
    }

    async name(): Promise<string> {
        return this._contract.name();
    }

    async symbol(): Promise<string> {
        return this._contract.symbol();
    }

    async approve(address: string, amount: number) {
        const wei = ethers.utils.parseEther(amount.toString());
        const approveTx = await this._contract.approve(address, wei);

        return this._handleTransactionRespone(approveTx);
    }
}

export default Erc20;