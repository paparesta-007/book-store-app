import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import { BookOpenTextIcon } from "@phosphor-icons/react";

export const DailyCarousel: React.FC = () => {

    // mockup reading book
    const [currentBook, setCurrentBook] = useState<any>(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getSingleBook/${"x8oVEQAAQBAJ"}`);
                // Mockup book ID
                const bookData = await response.json();
                setCurrentBook(bookData);
            } catch (error) {
                console.error("Errore nel recupero dei dettagli dei libri:", error);
            }
        };
        fetchBookDetails();

    }, []);
    const { user } = useContext(UserContext);
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
        <div className="flex flex-col lg:flex-row gap-12 py-8 px-4 items-start">
            
            {/* Sezione Sinistra: Benvenuto e Citazione */}
            <div className="flex-1 space-y-6">
                <header>
                    <h1 className="text-4xl md:text-5xl f-lora">
                        <span className="text-(--text-gray-dark) font-light block text-2xl mb-1 italic">
                            {getGreeting()},
                        </span>
                        <span className="font-semibold text-(--text-primary)">
                            {user?.displayName || "Reader"}!
                        </span>
                    </h1>
                </header>

                <blockquote className="relative pl-6 border-l-2 border-(--text-accent)/30">
                    <p className="text-lg md:text-xl text-(--text-gray-light) italic leading-relaxed max-w-xl">
                        "Leggendo non cerchiamo idee nuove, ma pensieri già da noi pensati, 
                        che acquistano sulla pagina un suggello di conferma..."
                    </p>
                    <footer className="mt-4">
                        <span className="text-(--text-accent) font-medium tracking-wide uppercase text-sm">
                            — Cesare Pavese
                        </span>
                    </footer>
                </blockquote>
            </div>

            {/* Sezione Destra: Card libro */}
            <div className="w-full lg:w-137.5">
                <h2 className="text-xs uppercase tracking-[0.2em] text-(--text-gray-light) font-bold mb-6">
                    In Reading Right Now
                </h2>
                
                {currentBook ? (
                    <div className="group relative flex gap-6 p-5  rounded-2xl border border-(--bg-gray-light) ">
                        {/* Copertina con ombra accentuata */}
                        <div className="shrink-0  transition-transform duration-300 ">
                            <img 
                                src={currentBook.volumeInfo.imageLinks.large} 
                                alt={currentBook.volumeInfo.title} 
                                className="w-40  object-cover rounded-lg  border border-white/10" 
                            />
                        </div>

                        <div className="flex flex-col justify-between py-2 flex-1">
                            <div>
                                <h3 className="text-lg font-bold f-poppins leading-tight line-clamp-2">
                                    {currentBook.volumeInfo.title}
                                </h3>
                                <p className="text-sm text-(--text-gray-light) mt-1 italic">
                                    {currentBook.volumeInfo.authors?.join(", ")}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-(--text-gray-light) uppercase tracking-wider">Progress</span>
                                        <span className="text-(--text-primary)">14%</span>
                                    </div>
                                    {/* Progress Bar Migliorata */}
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-(--text-primary) rounded-full" 
                                            style={{ width: '14%' }}
                                        ></div>
                                    </div>
                                </div>

                                <button className="w-full flex items-center gap-2 justify-center py-2.5 px-4 bg-(--text-accent) text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
                                    <BookOpenTextIcon size={24} weight="fill"  />Continue Reading
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-44 border-2 border-dashed border-(--bg-gray-light) rounded-2xl flex items-center justify-center text-(--text-gray-light)">
                        Select a book to start reading
                    </div>
                )}
            </div>
        </div>
    );
};
export default DailyCarousel;