import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { productsApi } from "@/store/products/products.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productReducer } from "@/store/products/product.slice";
import { favoriteReducer } from "@/store/favorite/favorite.slice";


export const reducers = combineReducers( {
   [productsApi.reducerPath]: productsApi.reducer,
   favorite: favoriteReducer,
   product: productReducer
})
export const store = configureStore({
   reducer: reducers,
   middleware: getDefaultMiddleware =>
       getDefaultMiddleware().concat(productsApi.middleware)
});

setupListeners(store.dispatch);
export  type TypeRootState = ReturnType<typeof store.getState>