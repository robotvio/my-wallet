import {dynamodb} from '../../../utils/db'
import {NextResponse} from "next/server";
import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';


const tableName = 'UsersTable';

type User = {
    username: string,
    password: string,
    role: string
};

export async function POST(request: Request) {
    const data: User = await request.json()
    console.log('data: ', data)


    const { username, password } = data
    const loginAsync = promisify(loginUser);
    try {
        const token = await loginAsync(username, password)
        return NextResponse.json({token})
    }catch (err) {
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
    }

}
// Login user
const loginUser = (username: string, password: string, callback: ( err?: Error,token?: string) => void) => {
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const params: AWS.DynamoDB.GetItemInput = {
        TableName: tableName,
        Key: {
            userId: { S: username }
        }
    };

    dynamodb.getItem(params, (err, data) => {
        if (err) {
            console.error('Error logging in:', err);
            callback(err, undefined);
        } else {
            const storedPassword = data?.Item?.password?.S;
            if (storedPassword === hashedPassword) {
                // Password matches, generate JWT token
                const token = jwt.sign({ username, userId:username ,role:data.Item.role.S}, process.env.JWT_SECRET, { expiresIn: '24h', algorithm: 'HS256' });
                console.log('User logged in successfully');
                callback(undefined,token);
            } else {
                console.error('Incorrect password');
                callback(new Error("Incorrect password"), undefined);
            }
        }
    });
};

const createTable = () => {
    const params: AWS.DynamoDB.CreateTableInput = {
        TableName: 'WalletTable',
        KeySchema: [
            { AttributeName: 'walletId', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'walletId', AttributeType: 'S' }, // Partition key
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    dynamodb.createTable(params, (err, data) => {
        if (err) console.error('Error creating table:', err);
        else console.log('Table created successfully:', data);
    });
};
