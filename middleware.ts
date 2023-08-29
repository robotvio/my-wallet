import { NextResponse } from "next/server"
import {decodeToken} from "./utils/auth"


export function middleware(request: Request) {


    const authorizationHeader = request.headers.get('authorization');
    if (!authorizationHeader) {
        console.log('authorization header not found')
        return  NextResponse.json({error: 'authorization header not found'}, {status: 401})
    }
    const token = authorizationHeader.replace('Bearer ', '');
    // const decodedToken = decodeToken(token)
    if (!token){
        return  NextResponse.json({error: 'authorization header not valid'}, {status: 401})
    }
    // console.log(request.method)
    // console.log(request.url)



    return NextResponse.next()
}

export const config = {
    matcher: ['/api/wallet/:path*','/api/transactions/:path*'],
}