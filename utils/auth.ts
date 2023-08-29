import jwt from 'jsonwebtoken';
import {Jwt} from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
interface DecodedToken extends JwtPayload {
    role: string;
    username: string;
    userId:string;
}

export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};


export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

export const setUserId = (userId: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('userId', userId);
    }
};

export const getUserId = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('userId');
    }
    return null;
};


export const removeUserId = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userId');
    }
};

export const decodeToken = (token: string) : DecodedToken | null => {
    const secret = process.env.JWT_SECRET
    try {
        const verifyDecoded = jwt.verify(token, secret!) as DecodedToken ;
        // let decoded: DecodedToken = {userId: verifyDecoded.userId, username:erifyDecoded.username,role:verifyDecoded.role}
        return verifyDecoded

    } catch (error) {
        console.error('Token decoding error:', error);
        return null;
    }
};