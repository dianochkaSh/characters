import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {isAxiosError} from "axios";
import { AxiosResponse } from 'axios';
import { IProduct } from "@/store/products/products.types";
interface IProductAxios {
    info: {

    },
    results: IProduct[]
}
interface IProductAxiosReject{
    error: string
}
interface MyError {
    message: string;
    statusCode?: number;
}

export const getProducts =  createAsyncThunk<IProduct[], void, { rejectValue:IProductAxiosReject}>(
    'products',
    async():Promise<any> => {
        try {
            const response:AxiosResponse<IProductAxios> = await axios.get(
                `https://rickandmortyapi.com/api/character`
            );
            const data: IProduct[] = response.data.results;
            return data;
        } catch (error: unknown) {
            if(error instanceof Error) {
                return error.message;
            }
        }
    }
);

export const getProductById = createAsyncThunk<IProduct, number, { rejectValue:IProductAxiosReject}>(
  `getOneProduct`,
  async(id:number):Promise<any> => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
         );
      return response.data;
      } catch (error: unknown) {
        if(error instanceof Error)
            return error.message;
    }
  }
);
export const searchByName = createAsyncThunk<IProduct[], string,{ rejectValue: MyError }>(
    'searchProducts',
    async (name, { rejectWithValue }):Promise<any> => {
        try {
            const response: AxiosResponse<IProductAxios> = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            const data: IProduct[] = response.data.results;
            return data;
        } catch (error: any) {
            if (isAxiosError(error)) {
                // Axios error, potentially with a response from the server
                return rejectWithValue({
                    message: error.response?.data?.error || 'Unknown error',
                    statusCode: error.response?.status,
                });
            }
            // Other types of errors
            return rejectWithValue({message: error.message || 'Something went wrong'});
        }
    }
);
