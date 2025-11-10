
import ProductItems from '@/components/ProductItems';
import { IProduct } from '@/store/products/products.types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stateProducts } from '@/store/products/product.slice';
import { getProducts } from '@/store/products/product.actions';
import SearchComponent from "@/components/SearchComponent";

const ProductsList = () => {
  const dispatch = useDispatch<any>()
  const { products , isLoading, hasError, textError}  = useSelector(stateProducts);

    useEffect(() => {
      if (products.length == 0) {
        dispatch(getProducts());
      }
    }, [dispatch]);
  return(
    <div >
      <SearchComponent />

      { isLoading ?  (
            "Loading..."
      ) : hasError ? (
        <div className="text-red-600"> {textError} </div>
      ) : (
        <div className="flex flex-wrap justify-around">
          {products && products.length > 0 && products?.map((product: IProduct) => (
            <ProductItems key={product.id} productItem={product}/>
          ))};
        </div>
      )
      }
    </div>
  )
}
export default ProductsList