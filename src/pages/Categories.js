import React, { useState, useEffect } from "react";
import { fetchCategories } from "../services (api)/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getCategories();
  }, []);

  if (error) {
    return <div>Error fetching categories: {error}</div>;
  }

  return (
    <div>
      <h1> Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} ({category.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
