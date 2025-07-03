import axios from 'axios';

const API_URL = "http://localhost:8081/api/v1";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    }catch (error) {
        console.error('error fetching categories :', error);
        throw error;
    }
};


export const addCategory = async (category) => {
    try {
        const response = await axios.post(`${API_URL}/categories`, category);
        return response.data;
    } catch (error) {
        console.error('error adding category :', error);
        throw error;
    }
};

export const fetchCategoriesByType = async (type) => {
    try {
        const response = await axios.get(`${API_URL}/categories/type/${type}`);
        return response.data;
    } catch (error) {
        console.error('error fetching category by type :', error);
        throw error;
    }
};