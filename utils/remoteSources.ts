
export const getTransactionsETH = async (address : string) :Promise<any[]> => {
    const res = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${process.env.ETH_API_KEY}`, {
        method: 'GET',
    })
    return new Promise<any[]>(async (resolve, reject) => {

        if (res.ok) {
            const  result  = await res.json();
            resolve(result.result)

        } else {
            // Handle login error
            reject('Getting Transaction Fails')
            console.error('');
        }
    })
}

export const getTransactionsBTC = async (address: string) :Promise<any[]> => {
    const res = await fetch(`https://blockstream.info/api/address/${address}/txs`, {
        method: 'GET',
    })
    return new Promise<any[]>(async (resolve, reject) => {

        if (res.ok) {
            const  result  = await res.json();
            resolve(result.result)

        } else {
            // Handle login error
            reject('Getting Transaction Fails')
            console.error('');
        }
    })
}
export const getTransactionsBTCFake = async (walletId:string,walletAddress:string) :Promise<any[]> => {
    const res = await fetch(`${process.env.BASE_URL}/api/fake/btc/?walletAddress=${walletAddress}&walletId=${walletId}`, {
        method: 'GET',
    })
    return new Promise<any[]>(async (resolve, reject) => {

        if (res.ok) {
            const  result  = await res.json();
            const transactions = convertBtcTransactions(result.result)
            resolve(transactions)

        } else {
            // Handle login error
            reject('Getting Transaction Fails')
            console.error('');
        }
    })
}
export const getTransactionsETHFake = async (walletId:string,walletAddress:string) :Promise<any[]> => {
    const res = await fetch(`${process.env.BASE_URL}/api/fake/eth/?walletAddress=${walletAddress}&walletId=${walletId}`, {
        method: 'GET',
    })
    return new Promise<any[]>(async (resolve, reject) => {

        if (res.ok) {
            const  result  = await res.json();
            const transactions = convertEthTransactions(result.result)
            resolve(transactions)

        } else {
            // Handle login error
            reject('Getting Transaction Fails')
            console.error('');
        }
    })
}
const convertBtcTransactions = (dataToConvert : MockObjectBTC[])  :TransactionObject[] => {
    let transactions : TransactionObject[] = []
    for (let trans of dataToConvert){
        let transaction : TransactionObject = {
            walletId:trans.walletId,
            walletAddress:trans.walletAddress,
            amount : trans.convertedAmount,
            direction : trans.direction === 'Incoming' ? 'IN' : 'OUT',
            exchangeRateUnit : trans.exchangeRateUnit,
            feeAmount : trans.feeAmount,
            id : trans.id,
            recipient : trans.recipient,
            sender : trans.sender,
            tid : trans.id,
            symbol : trans.symbol,
            type:trans.type
        }
        transactions.push(transaction)
    }
    return transactions
}
const convertEthTransactions = (dataToConvert : MockObjectETH[])  :TransactionObject[] => {
    let transactions : TransactionObject[] = []
    for (let trans of dataToConvert){
        let transaction : TransactionObject = {
            walletId:trans.walletId,
            walletAddress:trans.walletAddress,
            amount : trans.convertedAmount,
            direction : trans.direction === 'Incoming' ? 'IN' : 'OUT',
            exchangeRateUnit : trans.exchangeRateUnit,
            feeAmount : trans.fee.feeAmount,
            id : trans.id,
            recipient : trans.recipient,
            sender : trans.sender,
            tid : trans.id,
            symbol : trans.symbol,
            type:trans.type
        }
        transactions.push(transaction)
    }
    return transactions
}