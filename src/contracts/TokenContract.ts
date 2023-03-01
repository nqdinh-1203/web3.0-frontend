import { ethers } from "ethers";
import { Erc20 } from "./interfaces";
import { getRPC } from "./utils";
import { tokenABI, tokenAddress } from "./utils";

export default class TokenContract extends Erc20 {
    constructor(provider?: ethers.providers.Web3Provider) {
        const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
        super(provider || rpcProvider, tokenAddress, tokenABI);

        if (!provider) {
            this._contract = new ethers.Contract(this._contractAddress, this._abi, rpcProvider.getSigner());
        }
    }
}