import {dynamodb} from '../../../utils/db'
import {NextResponse} from "next/server";
import * as AWS from 'aws-sdk';
import { promisify } from 'util';
import {decodeToken} from "../../../utils/auth"
import { ethTransactionQueue, btcTransactionQueue } from '../../../utils/queueManager';
import {withRateLimiter} from '../../api/middleware'




const tableName = 'WalletTable';




export async function POST(request: Request) {
    const data: Wallet = await request.json()
    const decoded = decodeToken(request.headers.get('authorization').replace('Bearer ', ''))

    const { name, address, type, id, userId } = data
    console.log('adding')
    console.log(decoded.username)
    console.log(userId)
    if (decoded.username !== userId){
        return NextResponse.json({error: 'Authentication failed'}, {status: 401})
    }
    console.log('auth ok')
        const addWalletAsync = promisify(addWallet);
    try {
        const token = await addWalletAsync(name, address, type, id, userId!)
        if (type === 'ETH') {
            await ethTransactionQueue.add(decoded.username + '-' + address, {address,id})
        }
        else {
            await btcTransactionQueue.add(decoded.username + '-' + address, {address,id})
        }


        return NextResponse.json({token})
    }catch (err) {
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
    }
}



export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const decoded = decodeToken(request.headers.get('authorization').replace('Bearer ', ''))

    const userId : string | null = searchParams.get('userId')
    if (decoded.username !== userId){
        return NextResponse.json({error: 'Authentication failed'}, {status: 401})
    }
    const getWalletAsync = promisify(getWallet);
    try {
        const result = await getWalletAsync(decoded.username)
        return NextResponse.json({result})
    }catch (err) {
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
    }
}
export async function DELETE(request: Request) {
    const data: WalletToDelete = await request.json()
    const decoded = decodeToken(request.headers.get('authorization').replace('Bearer ', ''))

    const { walletId, userId } = data
    console.log(decoded.username)
    console.log(userId)
    if (decoded.username !== userId){
        return NextResponse.json({error: 'Authentication failed'}, {status: 401})
    }
    console.log('auth ok')
    const deleteWalletAsync = promisify(deleteWallet);
    try {
        const token = await deleteWalletAsync( walletId )
        return NextResponse.json({token})
    }catch (err) {
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
    }
}


// export const POST = withRateLimiter(POST);
// export const GET = withRateLimiter(GET);
// export const DELETE = withRateLimiter(DELETE);
// Add Wallet
const addWallet = (name: string, address: string, type:string, walletId:string,userId:string, callback: ( err?: Error) => void) => {

    const params: AWS.DynamoDB.PutItemInput = {
        TableName: tableName,
        Item: {
            walletId: { S: walletId},
            name: { S: name },
            address: { S: address },
            type: { S: type },
            userId: { S: userId },
        }
    };
    console.log('adding wallet',name,address,type,walletId,userId)
    dynamodb.putItem(params, (err) => {
        if (err) {
            console.error('Error registering user:', err);
            callback(err);
        } else {
            console.log('User registered successfully');
            callback();
        }
    });

};


//Get Wallet
const getWallet = (userId:string, callback: (err?: Error, data?: any) => void) => {

    const params: AWS.DynamoDB.ScanInput = {
        TableName: tableName,
        FilterExpression: 'userId = :value', // Replace with your filter expression
        ExpressionAttributeValues: {
            ':value': { S: userId } // Replace with the value you're filtering by
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


//Get Wallet
const deleteWallet = (walletId:string, callback: (err?: Error, data?: any) => void) => {

    const params: AWS.DynamoDB.DeleteItemInput = {
        TableName: tableName,
        Key: {
            walletId: { S: walletId } // Replace 'primaryKey' and 'itemKey' with your actual key details
        }
    };
    console.log('Deleting wallet',walletId)

    dynamodb.deleteItem(params, (err, data) => {
        if (err) {
            console.error('Error deleting item:', err);
            callback(err, undefined);
        } else {
            console.log('Item deleted successfully:', data);
            callback(undefined,data);
        }
    });

};

