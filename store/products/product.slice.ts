import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductById, getProducts, searchByName } from "@/store/products/product.actions";
import { TypeRootState } from "@/store/store";
import { IProduct } from "@/store/products/products.types";

interface  IInitialState {
    products: IProduct[],
    isLoading: boolean,
    hasError: boolean,
    textError: string | undefined,
    oneProduct: IProduct,
    addProduct: IProduct
}
interface IObject {
    [key: string]: string
}

const InitialState:IInitialState =  {
  products: [],
  isLoading: false,
  hasError: false,
  textError: '',
  oneProduct: {
    id: 0,
    name: 'string',
    image: '',
    location: {
        name: '',
        url: ''
    },
    species: '',
    gender: ''
  },
  addProduct: {
    id: 0,
    name: '',
    image: '',
    species: '',
    gender: ''
  },
}
export const productSlice = createSlice({
  name: 'product',
  initialState: InitialState,
  extraReducers: (builder) => {
    builder
      .addCase (getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        state.textError = '';
      })
    .addCase(getProducts.fulfilled, (state, action) => {
       state.products = action.payload;
       state.isLoading = false;
       state.hasError = false;


    })
    .addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;

    })
    .addCase(getProductById.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
    })
    .addCase(getProductById.fulfilled, (state, action:PayloadAction<IProduct>) => {
       state.oneProduct = action.payload
       state.isLoading = false;
       state.hasError = false
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.hasError = true;
    })
    .addCase(searchByName.pending,(state, action) => {
      state.hasError = false;
      state.isLoading = true;
    })
    .addCase(searchByName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.products = action.payload;
      state.textError = '';
    })
    .addCase(searchByName.rejected, (state, action) => {
      state.hasError = true;
      state.isLoading = false;
      state.textError = action.payload?.message;
    })
  },
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);

    },
     deleteItem : (state, action: PayloadAction<number>) => {
        const index = state.products.findIndex(item=> item.id === action.payload);
        if(index !== -1) {
            state.products.splice(index, 1);
        }
    },
     changeFormData: (state, action: PayloadAction<IObject>) => {
       const { key, value } = action.payload;
       state.addProduct = {...state.addProduct, [key]: value};
     },
      editItem: (state, action:PayloadAction<IProduct>) => {
          const index = state.products.findIndex(item=> item.id === action.payload.id);
          if(index !== -1) {
              state.products[index] = action.payload;
          }
      },
      handlerFieldEdit: (state, action:PayloadAction<IObject>) => {
          const { key, value } = action.payload;
          state.oneProduct = {...state.oneProduct, [key]: value};
      }

  }
});

export const stateProducts =   (state: TypeRootState )=> state.product;
export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
