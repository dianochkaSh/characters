
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import { IProduct } from '@/store/products/products.types';
import Link from "next/link";
import Image from "next/image";
import { favoriteActions, favoriteState } from "@/store/favorite/favorite.slice";
import { productAction } from "@/store/products/product.slice";
interface Props {
  key: number,
  productItem: IProduct
}

const ProductItems:React.FC<Props> = ({ key, productItem }) => {
  const dispatch = useDispatch();
  const { favoriteProducts} = useSelector(favoriteState)
  const handlerFavoriteChange = (productItem:IProduct) => {
    dispatch(favoriteActions.toggleItem(productItem));
  }

  const handlerDeleteItem = (id: number) => {
      dispatch(productAction.deleteItem(id));
  }

  const isFavorite:boolean = favoriteProducts.some(p=>p.id === productItem.id);
  return (
      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
          {/*<div className=" w-full sm:w-1/2 md:w-1/2 border border-gray-300 rounded-lg p-2 shadow-md">*/}
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
              <div className="p-4 flex">
                  <button onClick={() => handlerDeleteItem(productItem.id)}
                          className="p-2 ml-auto ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      <span className="sr-only">Delete</span>
                  </button>
                  <button
                      className="p-2 rounded-full ml-auto hover:bg-red-600 text-red-100 focus:outline-none focus:ring-2 focus:ring-red-800"
                      onClick={() => handlerFavoriteChange(productItem)}>
                      {isFavorite ?
                          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg"
                               stroke="#000000">

                              <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                 stroke="#CCCCCC"
                                 stroke-width="0.096"/>

                              <g id="SVGRepo_iconCarrier">
                                  <path
                                      d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
                                      fill="#fd1808"/>
                              </g>

                          </svg>
                          :
                          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg"
                               stroke="#e59999">

                              <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                 stroke="#CCCCCC"
                                 stroke-width="0.096"/>

                              <g id="SVGRepo_iconCarrier">
                                  <path
                                      d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
                                      fill="#e59a94"/>
                              </g>

                          </svg>

                      }
                  </button>
                  <Link className="p-4 ml-auto " href={`/products/${productItem.id}/edit`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                           stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer">
                          <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.652.884a.75.75 0 01-.93-1.342l.884-2.652a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                      </svg>
                  </Link>
              </div>
              <Link href={`/products/${productItem.id}`} className="flex flex-row p-4">
                  <div>
                      <Image src={productItem.image} width={150} height={150} alt={productItem.name}/>
                      {/*<img className="size-48 shadow-xl rounded-md" src={productItem.image} alt='' width={150} height={150}/>*/}
                  </div>
                  <div className="flex flex-col p-4">
                      <span className="text-2xl font-medium">{productItem.name}</span>
                      <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                        <span>{productItem.species}</span>
                        </span>
                  </div>
             </Link>
         </div>

      </div>
  )
}
export default ProductItems;