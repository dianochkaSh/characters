import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts =  createAsyncThunk(
    'products',
    async() => {
        try {
            const response = await axios.get(
                `https://rickandmortyapi.com/api/character`
            );
            return response.data.results;
        } catch (error) {
            return error;
        }
    }
);

export const getProductById = createAsyncThunk(
  `getOneProduct`,
  async(id) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
         );
      return response.data;
      } catch (error) {
        return error;
    }
  }
);
export const searchByName = createAsyncThunk(
    'searchProducts',
    async (name) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            return response.data.results;
        } catch (error ) {
            return error;
        }
    }
);
