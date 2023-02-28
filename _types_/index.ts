export interface ITransfer {
    sender: string,
    receiver: string,
    amount: number,
    message: string,
    timestamp: number,
    keyword: string
}

export interface IInput {
    addressTo: string,
    amount: number,
    message: string,
    keyword: string
}