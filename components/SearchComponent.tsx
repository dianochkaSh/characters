import React, {useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { debounce } from "next/dist/server/utils";
import { searchByName } from "@/store/products/product.actions";

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch<any>();
    const handlerValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        debouncedFetchResults(searchTerm);

    }

    const debouncedFetchResults = useCallback(
        debounce((term) => {
            dispatch(searchByName(term));
        }, 1000),
        [dispatch]
    );


    return (
        <div className="flex justify-end">
            <form className="w-1/2  p-2  m-2 h-20">
                <input
                    className="w-full h-[30px] border border-gray-300 rounded mb-2"
                    type="text"
                    name="search"
                    value={searchTerm}
                    onChange={(event) => handlerValue(event)}/>
            </form>
        </div>
    )
}
export default SearchComponent