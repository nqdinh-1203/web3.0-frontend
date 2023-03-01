import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils";
import { transABI, transAddress } from "./utils";
import { ITransaction } from "@/src/_types_";

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

    async getAllTransactions(): Promise<ITransaction[]> {
        const rawTrans: any[] = await this._contract.getAllTransactions();
        const trans: ITransaction[] = rawTrans.map((item: any) => ({
            addressFrom: item.sender,
            addressTo: item.receiver,
            amount: (this._toNumber(item.amount)).toString(),
            message: item.message,
            timestamp: new Date(item.timestamp.toNumber() * 1000).toLocaleString(),
            keyword: item.keyword
        }))

        return trans;
    }

    async getTransactionCount(): Promise<number> {
        const bigNumCount: BigNumber = await this._contract.getTransactionCount();
        return this._toNumber(bigNumCount);
    }
}