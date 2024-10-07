import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../API/URL';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (url) => {
        if (url) {
            const response = await axios.get(url);
            return response.data;
        }
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (category) => {
        const response = await axios.post(`${API_URL}/categories`, category);
        return response.data;
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (category) => {
        const response = await axios.put(`${API_URL}/categories/${category.id}`, category);
        return response.data;
    }
);
