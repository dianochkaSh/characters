import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeRootState} from "@/store/store";
import {IProduct} from "@/store/products/products.types";

 const initialState = {
     favoriteProducts: []
 }
export const favoriteSlice = createSlice ({
    name: 'favorite',
    initialState: initialState,
    reducers: {
        toggleItem: (state, action: PayloadAction<IProduct>) => {
            const isExist = state.favoriteProducts.some(r => r.id === action.payload.id);
            if (isExist) {
              const index = state.favoriteProducts.findIndex( item => item.id === action.payload.id );
              if(index !== -1) {
                  state.favoriteProducts.splice(index, 1);
              }

            } else {
                console.log(state);
                state.favoriteProducts.push(action.payload);
            }


        }
    }
})
export const favoriteReducer = favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
export const favoriteState = (state: TypeRootState ) => state.favorite