import {dynamodb} from '../../../utils/db'
import {NextResponse} from "next/server";
import * as AWS from 'aws-sdk';
import { promisify } from 'util';
import {decodeToken} from "../../../utils/auth"
import { ethTransactionQueue } from '../../../utils/queueManager';
const tableName = 'TransactionTable';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const decoded = decodeToken(request.headers.get('authorization').replace('Bearer ', ''))
    console.log(searchParams)

    const userId : string | null = searchParams.get('userId')
    const walletId : string  = searchParams.get('walletId')!

    if (decoded.username !== userId){
        return NextResponse.json({error: 'Authentication failed'}, {status: 401})
    }
    // await ethTransactionQueue.add(decoded.username+'-'+walletId, {walletId})

    const getTransactionsAsync = promisify(getTransactions);
    try {
        const result = await getTransactionsAsync(walletId)
        return NextResponse.json({result})
    }catch (err) {
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
    }
}
//Get Wallet
const getTransactions = (walletId:string, callback: (err?: Error, data?: any) => void) => {

    const params: AWS.DynamoDB.ScanInput = {
        TableName: tableName,
        FilterExpression: 'walletId = :value', // Replace with your filter expression
        ExpressionAttributeValues: {
            ':value': { S: walletId } // Replace with the value you're filtering by
        }
    };
    dynamodb.scan(params, (err, data) => {
        if (err) {
            console.error('Error scanning items:', err);
            callback(err, undefined);
        } else {
            console.log('Scanned items:', data.Items);
            callback(undefined,data.Items);
        }
    });

};