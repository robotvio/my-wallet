"use client"

import React, { useEffect, useState } from 'react';
import List from '../components/List';
import {getUserId} from "../../utils/auth"
import { v4 as uuidv4 } from 'uuid';
import {useRouter} from "next/navigation"
import { getWallets, addWallet, deleteWallet } from '../../utils/apis';
import Navigation from "../components/navigation";




const WalletPage: React.FC = () => {
    const router = useRouter()
    const [items, setItems] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemAddress, setNewItemAddress] = useState('');
    const [newSourceType, setNewSourceType] = useState('BTC');

    useEffect(() => {
        async function fetchData() {
            const userId = getUserId()
            try {
                const itemsData = await getWallets(userId)
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleAddItem = async () => {
        if (!newItemName.trim() || !newItemAddress.trim() ) return;
        const userId = getUserId()


        try {
            await addWallet({
                name: newItemName,
                address: newItemAddress,
                type: newSourceType,
                userId:userId,
                id:uuidv4()
            });

            setNewItemName('');
            setNewSourceType('BTC');
            setNewItemAddress('');
            setShowPopup(false);

            const updatedItems = await getWallets(userId);
            setItems(updatedItems);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };
    const handleDeleteItem = async (id: string) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this item?');
        if (!shouldDelete) {
            return;
        }
        try {
            const userId = getUserId()
            await deleteWallet(id, userId);

            const updatedItems = items.filter(item => item.walletId.S !== id);
            setItems(updatedItems);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleDetailsItem = (item: ListItem) => {
        // Implement details display logic here
        router.push(`/transactions/${item.walletId.S}`)
        console.log('Details:', item);
    };

    return (
        <div>
            <Navigation />
            <h1>List of wallets</h1>
            <button onClick={() => setShowPopup(true)}>Add Item</button>
            {loading ? <p>Loading...</p> : (
                <List items={items} onDelete={handleDeleteItem} onDetails={handleDetailsItem} />
            )}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add New Wallet</h2>
                        <select
                            value={newSourceType}
                            onChange={e => setNewSourceType(e.target.value)}
                        >
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>

                        </select>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={e => setNewItemName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={newItemAddress}
                            onChange={e => setNewItemAddress(e.target.value)}
                            placeholder="Address"
                        />

                        <button onClick={handleAddItem}>Submit</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
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

export default WalletPage;
