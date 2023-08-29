
type Wallet = {
    name: string,
    address: string,
    type: string,
    id:string,
    userId:string|null
};

type WalletToDelete = {
    walletId:string,
    userId:string|null
};
interface ListItem {
    address: { S:string };
    walletId: { S:string };
    name: { S:string };
    userId: { S:string };
    type: { S:string };

}

type MockObjectBTC = {
    walletId: string;
    walletAddress: string;
    id: string;
    tid: string;
    type:string;
    direction: string;
    feeAmount: number;
    feeConvertedAmount:number;
    feeExchangeRateUnit:string;
    feeSymbol:string;
    sender:string;
    recipient:string;
    convertedAmount:number;
    exchangeRateUnit:string;
    symbol:string
};

type MockObjectETH = {
    walletId: string;
    walletAddress: string;
    id: string;
    tid: string;
    type:string;
    direction: string;
    fee:EthFeeObject;
    sender:string;
    recipient:string;
    convertedAmount:number;
    exchangeRateUnit:string;
    symbol:string
};
type EthFeeObject = {
    feeAmount: number;
    feeConvertedAmount:number;
    feeExchangeRateUnit:string;
    feeSymbol:string;
}
type TransactionObject = {
    id: string;
    tid: string;
    type:string;
    direction: string;
    feeAmount: number;
    sender:string;
    recipient:string;
    amount:number;
    exchangeRateUnit:string;
    symbol:string;
    walletId:string;
    walletAddress:string;
};
type TransactionTableObject = {
    id: {S:string};
    tid: {S:string};
    type:{S:string};
    direction: {S:string};
    feeAmount: {N:string};
    sender:{S:string};
    recipient:{S:string};
    amount:{N:string};
    exchangeRateUnit:{S:string};
    symbol:{S:string};
    walletId:{S:string}
};
