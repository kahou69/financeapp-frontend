import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    }catch (error) {
        console.error('error fetching categories :', error);
        throw error;
    }
};

export const fetchTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return response.data;
    } catch (error) {
        console.error('error fetching transactions :', error);
        throw error;
    }
};

export const addTransaction = async (transaction) => {
    try {
        const response = await axios.post(`${API_URL}/transactions`, transaction);
        return response.data;
    } catch (error) {
        console.error('error adding transaction :', error);
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
