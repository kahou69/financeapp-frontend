import axios from 'axios';

const API_URL = "http://localhost:8081/api/v1";


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


