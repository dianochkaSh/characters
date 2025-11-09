import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "@/store/products/products.types";
import AxiosXHR = Axios.AxiosXHR;
interface IProductAxios {
    info: {

    },
    results: IProduct[]
}
interface IProductAxiosReject{
    error: string
}

export const getProducts =  createAsyncThunk<IProduct[], void, { rejectValue:IProductAxiosReject}>(
    'products',
    async():Promise<any> => {
        try {
            const response:AxiosXHR<IProductAxios> = await axios.get(
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
export const searchByName = createAsyncThunk<IProduct[], string, { rejectValue:IProductAxiosReject}>(
    'searchProducts',
    async (name):Promise<any> => {
        try {
            const response: AxiosXHR<IProductAxios> = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            const data: IProduct[] = response.data.results;
            return data;
        } catch (error ) {
            return error;
        }
    }
);
