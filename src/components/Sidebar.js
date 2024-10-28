import React from 'react';
import { Link } from 'react-router-dom';
import '../assets (images and css)/Sidebar.css';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>
                <SavingsIcon /> 
                Finance App
                </h2>
            </div>
    
        <ul>
            <li>
                <Link to=""> <HomeIcon /> Home</Link>
            </li>
            <li>
                <Link to="/transactions"> <AccountBalanceWalletIcon /> Transactions</Link>
            </li>
            <li>
                <Link to="/categories"> <CategoryIcon /> Categories</Link>
            </li>
        </ul>
        </div>
    );
  
};

export default Sidebar;