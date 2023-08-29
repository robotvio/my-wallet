// components/ProtectedRoute.tsx

import { useRouter } from "next/navigation"
import React,{ useEffect } from 'react';
import { getToken } from '../utils/auth';
type BoxProps = {
    children: React.ReactNode; // 👈️ type children
};

const ProtectedRoute: React.FC = (props: any) => {
    const router = useRouter();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            router.push('/login'); // Redirect to login page if token is not present
        }

    }, [token, router]);

    if (!token) {
        // You can show a loading spinner or some other UI while checking token
        return <div>Loading...</div>;
    }

    return <>{props.children}</>;
};

export default ProtectedRoute;
