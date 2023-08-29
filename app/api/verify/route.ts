import {NextResponse} from "next/server";
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';



type Token = {
    token: string
};

export async function POST(request: Request) {
    const data: Token = await request.json()
    console.log('data: ', data)


    const { token } = data
    const verifyAsync = promisify(verify);
    try {
        const res = await verifyAsync(token)
        return NextResponse.json({res})
    }catch (err) {
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 400})
    }

}
// Login user
const verify = (token: string, callback: ( err?: Error,token?: string) => void) => {


                const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
    callback(undefined,decoded);
                console.log('decoded',decoded)


};


