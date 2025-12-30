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
    <div className="w-full h-full ">
      <DailyCarousel />
      <div className="px-4 md:px-8 lg:px-16 py-8 space-y-6">
        <div className="flex items-center justify-between mt-8">
          <h2 className="text-2xl f-libre-baskerville text-(--text-gray-dark) mt-6 mb-4">Romance Books</h2>

          <div className="flex gap-0">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-[#272a34] hover:bg-(--text-primary) hover:text-gray-200 transition-colors duration-75 cursor-pointer f-poppins  rounded-full
            ">See All
              {/* <ArrowBendDownRightIcon size={24} /> */}

            </button>
            <button className="flex items-center justify-center gap-2 px-2 py-2 text-[#272a34] hover:bg-(--text-primary) hover:text-gray-200 transition-colors duration-75 cursor-pointer f-poppins  rounded-full">
              <CaretLeftIcon size={24} />

            </button>
            <button className="flex items-center justify-center gap-2 px-2 py-2 text-[#272a34] hover:bg-(--text-primary) hover:text-gray-200 transition-colors duration-75 cursor-pointer f-poppins rounded-full">
              <CaretRightIcon size={24} />

            </button>
          </div>
        </div>
        <div className="
            flex flex-row overflow-x-auto gap-4 pb-4 
            scrollbar-hide /* Opzionale: nasconde la barra brutta su mobile */
            sm:gap-24
          ">
          {books.map((book: any) => (
            <div key={book.id} className="">
              <BookComponent book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DiscoverPage;