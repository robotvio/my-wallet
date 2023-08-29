import {dynamodb} from '../../../utils/db'
import {NextResponse} from "next/server";
import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';


const tableName = 'UsersTable';

type User = {
    username: string,
    password: string,
    role:string
};

export async function POST(request: Request) {
    const data: User = await request.json()
    console.log('data: ', data)
    // createTable()


    const { username, password, role } = data
    registerUser(username,password,role,(err)=>{
        if(err) {
            return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
        }
        else return NextResponse.json({ message: 'User registered' })

    })

    return NextResponse.json({ username, password })
}

// Register user
const registerUser = (username: string, password: string,role: string, callback: (err?: Error) => void) => {
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    const params: AWS.DynamoDB.PutItemInput = {
        TableName: tableName,
        Item: {
            userId: { S: username},
            username: { S: username },
            password: { S: hashedPassword },
            role: { S: role}

        }
    };

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