import {NextResponse} from "next/server";
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import {decodeToken} from '../../../utils/auth'



type Token = {
    token: string
};

export async function POST(request: Request) {
    const data: Token = await request.json()
    console.log('data: ', data)


    const { token } = data
    try {
        const res = await decodeToken(token)
        return NextResponse.json({res})
    }catch (err) {
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
    }

}



