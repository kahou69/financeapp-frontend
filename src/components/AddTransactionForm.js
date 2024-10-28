import React, { useState, useEffect } from "react";
import { fetchCategoriesByType } from "../services (api)/api";

// eslint-disable-next-line react/prop-types
const AddTransactionForm = ({ onSubmit }) => {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    date: "",
    category: {
      id: null,
    },
  });

  const [categoryType, setCategoryType] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categoryType) {
      const getCategoriesByType = async () => {
        const data = await fetchCategoriesByType(categoryType);
        setCategories(data);

        if (data.length > 0) {
          setNewTransaction((prevValue) => ({
            ...prevValue,
            category: {
              id: data[0].id,
              name: data[0].name,
              type: data[0].type,
            },
          }));
        }
      };

      getCategoriesByType();
    }
  }, [categoryType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category.id") {
      const selectedCategory = categories.find(
        (cat) => cat.id === Number(value)
      );
      setNewTransaction((prevValue) => {
        return {
          ...prevValue,
          category: {
            id: selectedCategory.id,
            name: selectedCategory.name,
            type: selectedCategory.type,
          },
        };
      });
    } else {
      setNewTransaction((prevValue) => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
    }
  };

  const changeCategoriesName = (e) => {
    setCategoryType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting automatically
    console.log(newTransaction);
    onSubmit(newTransaction); // Pass the form data to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={newTransaction.description}
          name="description"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={newTransaction.amount}
          name="amount"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category Type:</label>
        <select required onChange={changeCategoriesName}>
          <option value="">Select Category</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </div>
      <div>
        <label>Categories :</label>
        <select required name="category.id" onChange={handleChange}>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
