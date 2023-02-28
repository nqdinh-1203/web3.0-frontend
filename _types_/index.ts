export interface ITransaction {
    id?: number,
    addressTo: string,
    addressFrom: string,
    amount: string,
    message: string,
    timestamp: string,
    keyword?: string,
    url?: string
}

export interface IInput {
    addressTo: string,
    amount: number,
    message: string,
    keyword: string
}