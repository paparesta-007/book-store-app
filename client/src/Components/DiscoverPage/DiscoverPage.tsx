import React from "react";

import { useState, useEffect } from "react";
import BookComponent from "../BookComponent/BookComponent";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import DailyCarousel from "./DailyCarousel/DailyCarousel";


const DiscoverPage: React.FC = () => {

  const [booksId, setBooksId] = useState([]);
  const [books, setBooks] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/searchBooks?searchTerm=limitless+senza&maxResults=3")
      .then((response) => response.json())
      .then((data) => {
        const formattedBooksId = data.map((book: any) => book.id);
        setBooksId(formattedBooksId);
      })
      .catch((error) => console.error("Errore:", error));
  }, []);
  useEffect(() => {
    const fetchBooksDetails = async () => {
      try {
        const booksData = await Promise.all(
          booksId.map(async (id: string) => {
            const response = await fetch(`http://localhost:3000/api/getSingleBook/${id}`);
            return response.json();
          })
        );
        setBooks(booksData);
        console.log("Dettagli libri recuperati:", booksData);
      } catch (error) {
        console.error("Errore nel recupero dei dettagli dei libri:", error);
      }
    };
    if (booksId.length > 0) {
      fetchBooksDetails();
    }
  }, [booksId]);



  return (
    <div className="w-full min-h-screen pb-20 px-5 sm:p-0">
      <DailyCarousel />

      {/* Sezione Libri con più spazio */}
      <section className="px-0 md:px-12 lg:px-6 space-y-1">
        
        {/* Header Sezione Minimal */}
        <div className="flex items-end justify-between  pb-4">
          <div className="space-y-1">
            <h2 className="text-xs uppercase tracking-[0.4em] text-(--text-gray-light) font-bold">
                Curated Collection
            </h2>
            {/* <h3 className="text-3xl f-lora italic text-(--text-primary)">Romance Selections</h3> */}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-xs uppercase tracking-widest font-bold py-2 px-4 rounded-full hover:bg-(--text-primary)
             hover:text-white text-(--text-primary) transition-colors">
                See All
            </button>
            <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-(--text-primary) hover:text-white transition-colors">
                    <CaretLeftIcon size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-(--text-primary) hover:text-white transition-colors">
                    <CaretRightIcon size={20} />
                </button>
            </div>
          </div>
        </div>

        {/* Lista Scorrevole con segnale visivo (Snap) */}
        <div className="
            flex flex-row overflow-x-auto gap-8 sm:gap-12 py-8 
            scrollbar-hide snap-x snap-mandatory
          ">
          {books.map((book: any) => (
            <div key={book.id} className="snap-start shrink-0">
              <BookComponent book={book} />
            </div>
          ))}
          <div className="shrink-0 w-20" />
        </div>
      </section>
    </div>
  );
}
export default DiscoverPage;