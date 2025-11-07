import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {productAction, stateProducts} from "@/store/products/product.slice";
import Form from "next/form";
import {IGenderConst} from "@/store/products/products.types";
import MainLayout from "@/layouts/MainLayout";
import React, {useEffect, useState} from "react";
import {getProductById} from "@/store/products/product.actions";
import {productSchema} from "@/schema";

const edit = () => {
    const router = useRouter()
    const { id } = router.query
    const { oneProduct, editProduct } = useSelector(stateProducts);
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const dispatch = useDispatch();

    const  handlerCheckValidation = async (formData: FormData) =>{
        const parsedData = productSchema.safeParse(Object.fromEntries(formData));

        if (!parsedData.success) {
            const errors = parsedData.error.flatten().fieldErrors;
            return { success: false, errors };
        }

        const { name, species, image } = parsedData.data;
        return { success: true, message: "Form submitted successfully!" };
    }


    const handlerEditForm = async (event: React.FormEvent<HTMLFormElement>) =>{
        const formData = new FormData()
        formData.append('id', oneProduct.id);
        formData.append('name', oneProduct.name);
        formData.append('species', oneProduct.species);
        formData.append('image', oneProduct.image);
        const result = await handlerCheckValidation(formData);

        if (!result.success) {
            setErrors(result.errors);
            setMessage(null);
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


    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        dispatch(getProductById(id));
    }, [id, router.isReady]);

    return(
        <MainLayout>
            <div className="px-4 ">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 px-4">Edit character</h2>
                <Form action={(e) => handlerEditForm(e)}>
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
export default edit;