import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "@/store/products/product.actions";
import {stateProducts} from "@/store/products/product.slice";
import { useRouter } from 'next/router';
import Link from "next/link";
import MainLayout from "@/layouts/MainLayout";

const product:React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { oneProduct } = useSelector(stateProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
     dispatch(getProductById(id));
  }, [id, router.isReady]);
  return (
    <MainLayout>
      <section className="px-4">
        <Link href={'/products'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" className="w-4 h-4 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
           </svg>
        </Link>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 px-4">{oneProduct.name}</h2>
        <div className="flex flex-col sm:flex-row">
          <div className="px-4 mb-4">
            <img className="shadow-xl rounded-md" src={oneProduct.image}/>
          </div>
          <div>
            <p>
              <span className="text-gray-400">location: </span>
              <span className="font-semibold">{oneProduct.location.name}</span>
            </p>
            <p>
              <span className="text-gray-400">species: </span>
              <span className="font-semibold">{oneProduct.species}</span>
            </p>
            <p>
              <span className="text-gray-400">gender: </span>
              <span className="font-semibold">{oneProduct.gender}</span>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  )

}
export default product;
