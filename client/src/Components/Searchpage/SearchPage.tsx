import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const SearchPage: React.FC = () => {
    // params arrive as /search/:query
    const { query } = useParams();
    const [searchParams] = useSearchParams();
    return (
        <div className="w-full h-full ">
            <h1 className="text-3xl f-lora italic ">Search Results</h1>
            <p className="mb-4 text-(--text-gray-light) f-poppins mt-2">Displaying search results for {query}</p>
            <p className="mb-4 text-(--text-gray-light) f-poppins mt-2">With categories: {searchParams.get("categories")}</p>
        </div>
    );
}

export default SearchPage;