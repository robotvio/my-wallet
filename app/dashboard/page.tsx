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
                        <div>
                            <p>Name: SABER</p>
                            <p>Email: SABER.KERAYECHIAN@GMAIL.COM</p>
                        </div>
                </div>

    );
};

export default Dashboard;
