import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "@/store/products/products.types";

export const productsApi = createApi({
    reducerPath: 'api/products',
    baseQuery: fetchBaseQuery ({ baseUrl : 'https://fakestoreapi.com/'}),
    endpoints: build => ({
        getProducts: build.query<IProduct[], number>(
            { query: (limit: number)=> `products?limit=${limit}`}
        )

    })
});

export const { useGetProductsQuery } = productsApi;