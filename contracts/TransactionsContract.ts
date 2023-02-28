import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils";
import { transABI, transAddress } from "./utils";
import { ITransfer } from "@/_types_";

export default class TransactionsContract extends BaseInterface {
    constructor(provider?: ethers.providers.Web3Provider) {
        const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
        super(provider || rpcProvider, transAddress, transABI);

        if (!provider) {
            this._contract = new ethers.Contract(this._contractAddress, this._abi, rpcProvider.getSigner());
        }
    }

    async addToBlockchain(receiver: string, amount: number, message: string, keyword: string) {
        const addTx: TransactionResponse = await this._contract.addToBlockchain(receiver, this._numberToEth(amount), message, keyword, this._option);
        return this._handleTransactionRespone(addTx);
    }

    async getAllTransactions(): Promise<ITransfer[]> {
        const rawTrans: any[] = await this._contract.getAllTransactions();
        const trans: ITransfer[] = rawTrans.map((item: any) => ({
            sender: item.sender,
            receiver: item.receiver,
            amount: this._toNumber(item.amount),
            message: item.message,
            timestamp: this._toNumber(item.timestamp),
            keyword: item.keyword
        }))

        return trans;
    }

    async getTransactionCount(): Promise<number> {
        const bigNumCount: BigNumber = await this._contract.getTransactionCount();
        return this._toNumber(bigNumCount);
    }
}