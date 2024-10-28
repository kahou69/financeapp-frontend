import React, {useState, useEffect} from 'react';
import { fetchTransactions, addTransaction } from '../services (api)/api';
import { Drawer, Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import  '../assets (images and css)/Transactions.css';
import AddTransactionForm from '../components/AddTransactionForm';


const Transactions = () => {
    const[transactions, setTransactions] = useState([]);
    const[error, setError] = useState(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchTransactions();
                setTransactions(data);

            }catch (err) {
                setError(err.message);
            }
        };

        getTransactions();
    }, [] );

    if(error){
        return <div>Error fetching transaction : {error}</div>
    }

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
      };
    
      const handleDrawerClose = () => {
            setIsDrawerOpen(false);
      };

      const addNewTransaction = async (newTransaction) => {
        try {
            const addedTransaction = await addTransaction(newTransaction);
            console.log("Transaction added : ", addedTransaction );
            setTransactions((prevTransactions) => [...prevTransactions, addedTransaction]);
            setIsDrawerOpen(false);
        } catch (err) {
            console.error(err)
        }
      };



    return (
        <div>
            <h1>Your Transactions</h1>
            <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
                <div style={{ width: '400px', padding: '20px' }}>
                <h2>Add Transaction</h2>
                <AddTransactionForm onSubmit={addNewTransaction} />
                </div>
             </Drawer>
            <div className="trans-table">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Diao</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        return (
                        <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.category.name} ({transaction.category.type})</td>
                            <td>adasdasd11qwdeqwd</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
       
            </div>
            <Fab variant="extended" size='medium' onClick={handleDrawerOpen}>
                <AddIcon  />
                Transactions
            </Fab>
        </div>
    );
};

export default Transactions;