import React from "react";
import { Link } from "react-router-dom";
import "../assets/Sidebar.css";
import SavingsIcon from "@mui/icons-material/Savings";

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
          <Link to="">
            {" "}
            Home
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            {" "}
           Transactions
          </Link>
        </li>
        <li>
          <Link to="/categories">
            {" "}
            Categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
