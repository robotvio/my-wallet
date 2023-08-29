// components/ProtectedRoute.tsx

import { useRouter } from "next/navigation"
import { useEffect } from 'react';
import { getToken } from '../utils/auth';

const ProtectedRoute: React.FC = ({ children }) => {
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

    return <>{children}</>;
};

export default ProtectedRoute;
