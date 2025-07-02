import React, { useState, useEffect } from "react";
import { fetchTransactions, addTransaction } from "../services (api)/api";
import { Drawer, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "../assets/Transactions.css";
import AddTransactionForm from "../components/AddTransactionForm";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getTransactions();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [transactions]);

  const calculateTotal = () => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.category.type === "INCOME") {
        income += parseFloat(transaction.amount);
      } else if (transaction.category.type === "EXPENSE") {
        expense += parseFloat(transaction.amount);
      }
    });

    setTotal(income - expense);
  };

  if (error) {
    return <div>Error fetching transaction : {error}</div>;
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
      console.log("Transaction added : ", addedTransaction);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        addedTransaction,
      ]);
      setIsDrawerOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Your Transactions</h1>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div className="transaction-drawer">
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
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.description}</td>
                  <td
                    style={{
                      color:
                        transaction.category.type === "INCOME"
                          ? "#4CAF50"
                          : "#F44336",
                    }}
                  >
                    {transaction.amount}
                  </td>
                  <td>{transaction.date}</td>
                  <td>
                    {transaction.category.name} ({transaction.category.type})
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td
                style={{
                  color: total >= 0 ? "#4CAF50" : "#F44336",
                  fontWeight: "bold",
                }}
              >
                {total}
              </td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Fab variant="extended" size="medium" onClick={handleDrawerOpen}>
        <AddIcon />
        Transactions
      </Fab>
    </div>
  );
};

export default Transactions;
