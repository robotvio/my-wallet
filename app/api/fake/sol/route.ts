import {NextResponse} from "next/server";
import {promisify} from "util";
import { v4 as uuidv4 } from 'uuid';
const arrayLength = 5




export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const walletId = searchParams.get('walletId')!
    const walletAddress = searchParams.get('walletAddress')!
    const result = generateRandomArray(walletId,walletAddress,arrayLength)
    return NextResponse.json({result})

}

function getRandomObject(walletId: string,walletAddress: string): MockObjectETH {
    const id = uuidv4()//Math.floor(Math.random() * 1000);
    const tid = uuidv4()
    const type = Math.random() < 0.5?'Internal':'external'
    const direction = Math.random() < 0.5?'Incoming':'outgoing'
    const feeAmount = Math.floor(Math.random() * 1000)
    const feeConvertedAmount = Math.floor(Math.random() * feeAmount)
    const feeExchangeRateUnit = Math.random() < 0.5?'USDT':'SOL'
    const feeSymbol = feeExchangeRateUnit==='USDT'?'SOL':'USDT'
    const fee :EthFeeObject ={
        feeAmount:feeAmount,
        feeConvertedAmount:feeConvertedAmount,
        feeExchangeRateUnit:feeExchangeRateUnit,
        feeSymbol:feeSymbol
    }
    const sender = direction==="Incoming"?uuidv4():walletAddress
    const recipient = direction==="Incoming"?walletAddress:uuidv4()
    const convertedAmount = Math.floor(Math.random() * 1000)
    const exchangeRateUnit = Math.random() < 0.5?'USDT':'SOL'
    const symbol = exchangeRateUnit==="USDT"?"SOL":"USDT"

    return { walletId,walletAddress,id, tid, type, direction, fee, sender, recipient, convertedAmount, exchangeRateUnit, symbol };
}

function generateRandomArray(walletId: string,walletAddress: string,length: number): MockObjectETH[] {
    const randomArray: MockObjectETH[] = [];

    for (let i = 0; i < length; i++) {
        const randomObject = getRandomObject(walletId,walletAddress);
        randomArray.push(randomObject);
    }

    return randomArray;
}