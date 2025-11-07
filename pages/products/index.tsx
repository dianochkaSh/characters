import React from "react";
import ProductsList from "@/components/ProductsList";
import MainLayout from "@/layouts/MainLayout";

const Product:React.FC = () => {
  return (
    <MainLayout>
      <div className="w-auto mx-auto">
        <ProductsList/>
      </div>
    </MainLayout>


  )
}
export default Product;
