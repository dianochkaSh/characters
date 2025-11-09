"use client";
import React, {useState} from 'react';
import Form from 'next/form';
import { useDispatch, useSelector } from 'react-redux';
import { productAction, stateProducts } from '@/store/products/product.slice';
import { IGenderConst } from '@/store/products/products.types';
import { productSchema } from "@/schema";
import MainLayout from "@/layouts/MainLayout";
import {useRouter} from "next/router";
interface IError {
  [key: string]: string[]
}

const CreateProject:React. FC = () => {
  const router = useRouter();
  const { addProduct } = useSelector(stateProducts);
  const [errors, setErrors] = useState<IError | null>(null);
  const dispatch = useDispatch<any>();

  const  handlerCheckValidation = async (formData: FormData) =>{
    const parsedData = productSchema.safeParse(Object.fromEntries(formData));

    if (!parsedData.success) {
      const errors: IError = parsedData.error.flatten().fieldErrors;
      return { success: false, errors };
    }
  }
  const generateTimestampId = (): number => {
    return Date.now();
  }
  const handlerSubmitForm  = async () => {
    //event.preventDefault();

    let id = generateTimestampId();
    const formData = new FormData()
    formData.append('id', id.toString());
    formData.append('name', addProduct.name);
    formData.append('species', addProduct.species);
    formData.append('gender', addProduct.gender);
    formData.append('image', addProduct.image);
    const result  = await handlerCheckValidation(formData);

    if (result !== undefined && !result.success) {
      setErrors(result.errors);
    } else {
      setErrors(null);
      dispatch(productAction.addProduct(addProduct));
      router.push("/products");
    }

  }
  const handlerGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newField = {
      key: 'gender',
      value: event.target.value
    }
    dispatch(productAction.changeFormData(newField));
  }
  const handlerField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newField = {
      key: event.currentTarget.name,
      value: event.target.value
    }
    dispatch(productAction.changeFormData(newField));
  }


  return (
    <MainLayout>
    <div className="px-4 ">
      <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 px-4">Create new character</h2>
      <Form action={() => handlerSubmitForm()}>

        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" id="name" name="name"
                 className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Enter your name"
                 value={addProduct.name}
                 onChange={handlerField}/>
          {errors?.name && <span style={{color: "red"}}>{errors.name[0]}</span>}

          <label htmlFor="Species" className="block text-sm font-medium text-gray-700 mb-1">Species</label>
          <input type="text" id="name" name="species"
                 className="mt-1  mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Enter your species"
                 value={addProduct.species}
                 onChange={handlerField}/>
          {errors?.species && <span style={{color: "red"}}>{errors.species[0]}</span>}
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input type="text" id="name" name="image"
                 className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Enter your image url"
                 value={addProduct.image}
                 onChange={handlerField}/>
          {errors?.image && <span style={{color: "red"}}>{errors.image[0]}</span>}
          <label htmlFor="Gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="mb-2" onChange={handlerGender}>
            <input name="gender" type="radio" value={IGenderConst.MALE}/>
            <label className="px-2" htmlFor="option1">{IGenderConst.MALE}</label>
            <input name="gender" type="radio" value={IGenderConst.FEMALE}/>
            <label className="px-2" htmlFor="option1">{IGenderConst.FEMALE}</label>
            <input name="gender" type="radio" value={IGenderConst.GENDERLESS}/>
            <label className="px-2" htmlFor="option1">{IGenderConst.GENDERLESS}</label>
          </div>
        </div>
        <button
            className=" mx-4 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit">
          Add new character
        </button>
      </Form>
    </div>
    </MainLayout>
  )
}
export default CreateProject;