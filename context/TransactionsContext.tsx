import TransactionsContract from '@/contracts/TransactionsContract';
import TokenContract from '@/contracts/TokenContract';
import { Contract, ethers } from 'ethers'
import React, { ReactNode } from 'react'
import { IInput, ITransaction } from '@/_types_';
import { tokenABI, tokenAddress, transABI, transAddress } from '@/contracts/utils';

type Props = {
    children: ReactNode
}

export const TransactionsContext = React.createContext({});

declare var window: any;

export const TransactionsProvider = ({ children }: Props) => {
    const [connectedAccount, setConnectedAccount] = React.useState('');
    const [formData, setFormData] = React.useState<IInput>({ addressTo: '', amount: 0, message: '', keyword: '' });
    const [isLoading, setIsLoading] = React.useState(false);
    const [count, setCount] = React.useState<number>(0);
    const [transactions, setTransactions] = React.useState<ITransaction[]>([]);

    const handleChange = (e: any, name: string) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const checkIfWalletConnected = async () => {
        try {
            // if (!window.ethereum) alert("Please install metamask!")

            // const accounts = await window.ethereum.request({ method: "eth_accounts" });

            // if (accounts.length) {
            //     setConnectedAccount(accounts[0])

            //     // getAllTransactions()
            // } else {
            //     console.log("No accounts found");
            // }
            console.log('check wallet connected: ', connectedAccount);

            if (connectedAccount !== '') getAllTransactions();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    const connectWallet = async () => {
        try {
            if (!window.ethereum) alert("Please install metamask!")

            console.log('...connecting wallet');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // const accounts = window.ethereum.request({ method: "eth_requestAccounts" });

            const address = await signer.getAddress();
            // const balance = (await signer.getBalance()).toNumber;

            setConnectedAccount(address);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!window.ethereum) alert("Please install metamask!")

            // get the data from form...
            const { addressTo, amount, keyword, message } = formData;

            console.log({ addressTo, amount, keyword, message });

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const tokenContract = new TokenContract(provider);
            const transactionContract = new TransactionsContract(provider);

            setIsLoading(true);
            console.log("...approving");
            const approveHash = await tokenContract.approve(transAddress, amount);
            console.log(`approve done - ${approveHash}`);

            console.log(`...adding`);
            const transactionHash = await transactionContract.addToBlockchain(addressTo, amount, message, keyword);
            console.log(`add done - ${transactionHash}`);
            setIsLoading(false);

            const transactionCount = await transactionContract.getTransactionCount();
            setCount(transactionCount);

            getAllTransactions();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    const getAllTransactions = async () => {
        try {
            if (!window.ethereum) alert("Please install metamask!")

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const transactionContract = new TransactionsContract(provider);

            const availableTransactions = await transactionContract.getAllTransactions();

            setTransactions(availableTransactions);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    React.useEffect(() => {
        checkIfWalletConnected();
    }, [connectedAccount])

    return (
        <TransactionsContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendTransaction, isLoading, transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}