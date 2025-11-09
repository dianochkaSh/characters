import {useRouter} from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { productAction, stateProducts } from '@/store/products/product.slice';
import Form from 'next/form';
import MainLayout from '@/layouts/MainLayout';
import React, { useEffect, useState } from 'react';
import { getProductById } from '@/store/products/product.actions';
import { productSchema } from '@/schema';
import {useSearchParams} from "next/navigation";
interface IError {
    [key: string]: string[]
}

const EditProject = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');
    const { oneProduct } = useSelector(stateProducts);
    const [errors, setErrors] = useState<IError | null>(null);
    const dispatch = useDispatch<any>();

    const  handlerCheckValidation = async (formData: FormData) =>{
        const parsedData = productSchema.safeParse(Object.fromEntries(formData));

        if (!parsedData.success) {
            const errors: IError  = parsedData.error.flatten().fieldErrors;
            return { success: false, errors };
        }

    }


    const handlerEditForm = async () =>{
        const formData = new FormData()
        formData.append('id', oneProduct.id.toString());
        formData.append('name', oneProduct.name);
        formData.append('species', oneProduct.species);
        formData.append('image', oneProduct.image);
        const result = await handlerCheckValidation(formData);

        if (result !== undefined && !result.success) {
            setErrors(result.errors);
        } else {
            setErrors(null);
            dispatch(productAction.editItem(oneProduct));
            router.push("/products");
        }
    }
    const handlerField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newField = {
            key: event.currentTarget.name,
            value: event.target.value
        }
        dispatch(productAction.handlerFieldEdit(newField));
    }

    let id:number;
    useEffect(() => {
        if (typeof idParam === 'string') {
            id = parseInt(idParam, 10);
            dispatch(getProductById(id));
        }
    }, [idParam]);

    return(
        <MainLayout>
            <div className="px-4 ">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 px-4">Edit character</h2>
                <Form action={() => handlerEditForm()}>
                    <div className="mb-4">
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="name" name="name"
                               className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                               placeholder="Enter your name"
                               value={oneProduct.name}
                               onChange={(event) => handlerField(event)}/>
                        {errors?.name && <span style={{color: "red"}}>{errors.name[0]}</span>}

                        <label htmlFor="Species" className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                        <input type="text" id="name" name="species"
                               className="mt-1  mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                               placeholder="Enter your species"
                               value={oneProduct.species}
                               onChange={(event) => handlerField(event)}/>
                        {errors?.species && <span style={{color: "red"}}>{errors.species[0]}</span>}
                        <label htmlFor="Image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <input type="text" id="name" name="image"
                               className="mt-1 mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                               placeholder="Enter your image url"
                               value={oneProduct.image}
                               onChange={(event) => handlerField(event)}/>
                        {errors?.image && <span style={{color: "red"}}>{errors.image[0]}</span>}
                    </div>
                    <button
                        className=" mx-4 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Edit character
                    </button>
                </Form>
            </div>
        </MainLayout>
    )
}
export default EditProject;