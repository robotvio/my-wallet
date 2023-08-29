// pages/profile.tsx
"use client"

import {useEffect, useState} from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import {getToken} from '../../utils/auth';
import Navigation from "../components/navigation";
import {useRouter} from "next/navigation";


const Dashboard: React.FC = () => {
    const router = useRouter();
    const token = getToken();
    const [userData, setUserData] = useState<any | null>(null);

    useEffect(() => {
        if (!token) {
            router.push('/login'); // Redirect to login page if token is not present
        }

    }, [token, router]);

    return (

                <div>
                    <Navigation/>
                    <h1>Profile Page</h1>
                    <h1>Code Assignment</h1>

                    {userData ? (
                        <div>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                        </div>
                    ) : (
                        <p>Loading user data....</p>
                    )}
                </div>

    );
};

export default Dashboard;
