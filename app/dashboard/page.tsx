// pages/profile.tsx
"use client"

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getToken} from '../../utils/auth';
import Navigation from "../components/navigation";





const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<any | null>(null);

    useEffect(() => {
        const token = getToken();
        async function verify(token) {
            const res = await fetch('http://localhost:3000/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token
                })
            })
            if (res.ok) {
                const  result  = await res.json();
                console.log(result)

            } else {
                // Handle login error
                console.error('Login failed');
            }

        }

        if (token) {

            // const decodedToken = decodeToken(token);
            verify(token).then(()=>{})
            // console.log(decodedToken)
            // Fetch user data using the token from an API or a database
            // For this example, we'll just use a mock user data
            const mockUserData = { name: 'Saber', email: 'saber.kerayechian@gmail.com' };
            setUserData(mockUserData);
        }
    }, []);

    return (
        <ProtectedRoute>
            <div>
                <Navigation />
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
        </ProtectedRoute>
    );
};

export default Dashboard;
