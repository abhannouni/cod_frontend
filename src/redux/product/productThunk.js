import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../API/URL';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (url) => {
        if (url) {
            const response = await axios.get(url);
            return response.data;
        }
        const response = await axios.get(`${API_URL}/products`);
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