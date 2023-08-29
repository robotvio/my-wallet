import { getToken} from '../utils/auth';

export const addWallet = async (wallet : Wallet) :Promise<string> => {
    const token = getToken();
    const res = await fetch('http://localhost:3000/api/wallet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(wallet)
    })
    return new Promise<string>(async (resolve, reject) => {

        if (res.ok) {
            const  result  = await res.json();
            resolve(result)

        } else {
            // Handle login error
            reject('Adding wallet failed')
            console.error('');
        }
    })
}


export const getWallets = async (userId:string) :Promise<any[]> => {
    const token = getToken();
    console.log('going to get wallet')
    const res = await fetch(`http://localhost:3000/api/wallet?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return new Promise<any[]>(async (resolve, reject) => {

        if (res.ok) {
            const  result  = await res.json();
            resolve(result.result)

        } else {
            // Handle login error
            reject('Getting wallet failed')
            console.error('');
        }
    })
}

export const deleteWallet = async (walletId: string, userId: string | null) :Promise<string> => {
    const token = getToken();
    const res = await fetch('http://localhost:3000/api/wallet', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({walletId,userId})
    })
    return new Promise<string>(async (resolve, reject) => {

        if (res.ok) {
            const  result  = await res.json();
            resolve(result)

        } else {
            // Handle login error
            reject('delete wallet failed')
            console.error('');
        }
    })
}
export const getTransactions = async (userId:string, walletId:string) :Promise<any[]> => {
    const token = getToken();
    const res = await fetch(`http://localhost:3000/api/transactions?userId=${userId}&walletId=${walletId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
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