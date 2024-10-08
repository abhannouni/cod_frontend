import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../API/URL';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ url, categoryIds = [], sortBy = 'name', limit = 10 }) => {
        if (url) {
            const response = await axios.get(url);
            return response.data;
        }
        
        const queryParams = new URLSearchParams();
        
        // Append multiple category_ids[] parameters
        if (categoryIds.length > 0) {
            categoryIds.forEach(id => queryParams.append('category_ids[]', id));
        }
        
        if (sortBy) {
            queryParams.append('sortBy', sortBy);
        }
        
        queryParams.append('limit', limit);

        const response = await axios.get(`${API_URL}/products?${queryParams.toString()}`);
        return response.data;
    }
);


export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (id) => {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    }
);

// Function to get CSRF token from meta tag
const getCsrfToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.content : '';
};


export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (formData) => {
        const csrfToken = getCsrfToken();  // Automatically get CSRF token
        
        const response = await axios.post(`${API_URL}/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': csrfToken  // Set the CSRF token in the headers
            }
        });
        return response.data;
    }
);
