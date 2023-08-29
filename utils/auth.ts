import jwt from 'jsonwebtoken';

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

export const decodeToken = (token: string) => {
    const secret = process.env.JWT_SECRET
    try {
        const decoded = jwt.verify(token, secret, { expiresIn: '24h', algorithm: 'HS256' });
        return decoded;
    } catch (error) {
        console.error('Token decoding error:', error);
        return null;
    }
};