import tokenAbi from "./PPC.json";
import transAbi from "./Transactions.json";

export const tokenABI = tokenAbi;
export const transABI = transAbi;
export const tokenAddress = "0xE5EF94941E6A0dA223B7ff9dd88Adb6e8c3C9F34";
export const transAddress = "0xfbc5286Cb13092e5D79b13d56da6cB534F69d3ee";

export const getRPC = (): string => {
    return "https://rpc-mumbai.maticvigil.com";
}