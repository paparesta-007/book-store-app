import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchItem from "./SearchItem";

const SearchPage: React.FC = () => {
    const { query } = useParams();
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Funzione asincrona interna per gestire tutto il processo
        const fetchAllData = async () => {
            if (!query) return;

            setIsLoading(true);
            // Reset immediato per evitare concatenazioni e loop
            setBooks([]); 

            try {
                // 1. Prima chiamata: prendiamo gli ID dei libri
                const searchResponse = await fetch(
                    `http://localhost:3000/api/searchBooks?searchTerm=${encodeURIComponent(query)}&maxResults=10`
                );
                const idList = await searchResponse.json();
                
                if (!idList || idList.length === 0) {
                    setBooks([]);
                    return;
                }

                // 2. Seconda fase: prendiamo i dettagli per ogni ID in parallelo
                const detailedBooks = await Promise.all(
                    idList.map(async (book: any) => {
                        const res = await fetch(`http://localhost:3000/api/getSingleBook/${book.id}`);
                        return res.json();
                    })
                );

                // 3. Salviamo tutto nello stato una volta sola
                setBooks(detailedBooks);
                console.log("Libri trovati:", detailedBooks);
            } catch (error) {
                console.error("Errore durante la ricerca:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [query, searchParams]); // Si attiva solo se cambia la ricerca o il filtro

    return (
        <div className="w-full h-full px-6 py-8">
            <header className="mb-10">
                <h1 className="text-3xl f-poppins tracking-tight text-(--text-primary)">
                    <span className="uppercase text-(--text-gray-dark)">Search Results for: </span> 
                    <span className="font-bold mx-2">{query}</span>
                    
                </h1>
               
            </header>

            {isLoading ? (
                // Skeleton Loader Semplice
                <div className="flex flex-col gap-6 animate-pulse">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-2xl w-full" />
                    ))}
                </div>
            ) : (
                <div className=" gap-8 grid sm:grid-cols-1 grid-cols-2">
                    {books.length > 0 ? (
                        books.map((book) => <SearchItem key={book.id} book={book} />)
                    ) : (
                        <p className="text-center py-20 text-gray-400 italic f-poppins">
                            No books found for this query.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;