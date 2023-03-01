import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, ethers, Overrides } from "ethers";

export default class BaseInterface {
    _provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
    _contractAddress: string;
    _abi: ethers.ContractInterface;
    _contract: ethers.Contract;
    _option: Overrides;

    constructor(
        provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
        contractAddress: string,
        abi: ethers.ContractInterface
    ) {
        this._provider = provider;
        this._contractAddress = contractAddress;
        this._abi = abi;
        this._option = { gasLimit: 300000 };
        this._contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    }

    _handleTransactionRespone = async (tx: TransactionResponse) => {
        try {
            const recept = await tx.wait();
            return recept.transactionHash;
        } catch (error: any) {
            throw new Error(error?.reason || `${error}`);
        }
    }

    _numberToEth = (amount: number) => {
        console.log("number to ether");
        return ethers.utils.parseEther(amount.toString());
    }

    _toNumber(bigNumber: BigNumber) {
        try {
            return bigNumber.toNumber();
        } catch (error) {
            console.log("to number");

            return Number.parseFloat(ethers.utils.formatEther(bigNumber));
        }
    }

    _toEther(bigNumber: BigNumber) {
        console.log("to ether");
        return Number.parseFloat(ethers.utils.formatEther(bigNumber));
    }

    _toWei(amount: number) {
        console.log("to wei");
        return ethers.utils.parseUnits(amount.toString());
    }
}