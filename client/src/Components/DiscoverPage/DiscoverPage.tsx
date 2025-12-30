import React, { useContext } from "react";
import Searchbar from "./Searchbar";
import { useState, useEffect } from "react";
import BookComponent from "../BookComponent/BookComponent";
import UserContext from "../../context/UserContext";
const DiscoverPage: React.FC = () => {
  const {user}=useContext(UserContext);
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

  const getGreeting = () => {
    const today = new Date();
    const hours = today.getHours();
    let greeting = "Good morning";
    if (hours >= 12 && hours < 18) {
      greeting = "Good afternoon";
    } else if (hours >= 18 || hours < 4) {
      greeting = "Good evening";
    }
    return greeting;
  }
  return (
    <div className="w-full h-full ">
      <h1 className="text-3xl f-lora italic ">{getGreeting()}, {user?.displayName || "User"}!</h1>
      <p className="mb-4 text-(--text-gray-light) f-poppins mt-2">Explore latest books and authors</p>
      <Searchbar />
      <div>
        <h2 className="text-2xl f-poppins text-(--text-gray-dark) mt-6 mb-4">Romance Books</h2>
        <div className="flex flex-wrap sm:flex-row flex-col gap-4">
          {books.map((book: any) => (
            <BookComponent key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default DiscoverPage;