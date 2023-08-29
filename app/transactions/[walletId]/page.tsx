"use client"

import React, { useEffect, useState } from 'react';
import List from '../../components/transactionsList';
import {getToken, getUserId} from "../../../utils/auth"
import { v4 as uuidv4 } from 'uuid';
import {useRouter} from "next/navigation"
import { getTransactions } from '../../../utils/apis';
import { downloadAsTextFile} from '../../../utils/downloadUtils';

import Navigation from "../../components/navigation";


type Props = {
    params: {
        walletId: string
    }
}

const TransactionPage: React.FC<Props> = ({ params: { walletId } }: Props) => {
    const [items, setItems] = useState<TransactionTableObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('user');


    useEffect(() => {
        const token = getToken()!;

        async function fetchData() {
            const userId = getUserId()
            try {
                const itemsData = await getTransactions(userId!,walletId)
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        async function verify(token : string) {
            const res = await fetch(process.env.BASE_URL+'/api/verify', {
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
                return result

            } else {
                // Handle login error
                console.error('Login failed');
            }

        }
        if (token) {
            // const decodedToken = decodeToken(token);
            verify(token).then((result)=>{
                console.log(result)
                setRole(result.res.role);
            })
        }

        fetchData();

    }, [walletId]);

    const handleDownload = () => {
        const listData = JSON.stringify(items, null, 2);
        downloadAsTextFile(listData, 'list_data.txt');
    };



    return (
        <div>
            <Navigation />
            <h1>List of Transactions</h1>
            {(role === 'admin'||role==='accountant') && <button onClick={handleDownload}>Download List</button>}
            {loading ? <p>Loading...</p> : (
                <List items={items} />
            )}


            <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
        </div>
    );
};

export default TransactionPage;
