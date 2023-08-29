import { NextResponse } from "next/server"
import {decodeToken} from "utils/auth"

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.sabertest.online', 'https://sabertest.online']
    : ['http://localhost:3000']

export function middleware(request: Request) {

    const origin = request.headers.get('origin')



    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    const authorizationHeader = request.headers.get('authorization');
    if (!authorizationHeader) {
        console.log('authorization header not found')
        return  NextResponse.json({error: 'authorization header not found'}, {status: 401})
    }
    const token = authorizationHeader.replace('Bearer ', '');
    // const decodedToken = decodeToken(token)
    // if (!decodedToken){
    //     return  NextResponse.json({error: 'authorization header not valid'}, {status: 401})
    // }
    console.log(request.method)
    console.log(request.url)



    return NextResponse.next()
}

export const config = {
    matcher: ['/api/wallet/:path*','/api/transactions/:path*'],
}