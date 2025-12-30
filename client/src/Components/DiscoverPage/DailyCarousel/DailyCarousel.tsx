import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import { ArrowUpRightIcon, BookOpenTextIcon } from "@phosphor-icons/react";

export const DailyCarousel: React.FC = () => {
    const [currentBook, setCurrentBook] = useState<any>(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getSingleBook/x8oVEQAAQBAJ`);
                const bookData = await response.json();
                setCurrentBook(bookData);
            } catch (error) {
                console.error("Errore:", error);
            }
        };
        fetchBookDetails();
    }, []);

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return "Good morning";
        if (hours < 18) return "Good afternoon";
        return "Good evening";
    }

    return (
        <div className="flex flex-col lg:flex-row gap-16 py-12 items-center lg:items-start max-w-7xl mx-auto">
            
            {/* Sezione Sinistra: Minimal Header */}
            <div className="flex-1 space-y-8">
                <header className="space-y-4">
                    <h1 className="text-5xl md:text-6xl f-playfair tracking-tight text-(--text-primary) font-light">
                        Hello, <span className="font-bold">{user?.displayName?.split(" ")[0] || "Reader"}</span>.
                    </h1>
                    <p className="f-poppins text-lg text-(--text-gray-light) leading-relaxed max-w-lg">
                        {getGreeting()}. It's a beautiful day to lose yourself in a story. 
                        We've curated a few titles that match your current mood.
                    </p>
                </header>
                
                <button className="group cursor-pointer flex items-center gap-3 text-white bg-(--text-primary) px-6 py-3 justify-center rounded-full font-semibold f-poppins
                 transition-all uppercase text-xs tracking-[0.25em]">
                    Explore Releases <ArrowUpRightIcon size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

            {/* Sezione Destra: Minimal Book Card */}
            <div className="w-full lg:w-125">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-(--text-gray-light) font-bold">
                        Current Reading
                    </h2>
                    <span className="text-[10px] text-(--text-gray-light) font-medium italic">Chapter 24/45</span>
                </div>
                
                {currentBook ? (
                    <div className=" relative bg-(--bg-secondary) rounded-lg border border-(--border-third) flex flex-col sm:flex-row gap-8 p-8">
                        {/* Immagine con posizionamento "floating" */}
                        <div className="shrink-0 transition-transform duration-500">
                            <img 
                                src={currentBook.volumeInfo.imageLinks?.large || currentBook.volumeInfo.imageLinks?.thumbnail} 
                                alt={currentBook.volumeInfo.title} 
                                className="w-32 sm:w-36 h-auto object-cover rounded-xl shadow-2xl" 
                            />
                        </div>

                        <div className="flex flex-col justify-between flex-1 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold f-poppins text-(--text-primary) leading-snug line-clamp-2">
                                    {currentBook.volumeInfo.title}
                                </h3>
                                <p className="text-sm text-(--text-gray-light) f-poppins">
                                    {currentBook.volumeInfo.authors?.join(", ")}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-(--text-gray-light)">
                                        <span>Completion</span>
                                        <span>14%</span>
                                    </div>
                                    <div className="w-full h-[3px] bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-(--text-primary) rounded-full" 
                                            style={{ width: '14%' }}
                                        ></div>
                                    </div>
                                </div>

                                <button className="w-full flex items-center gap-2 justify-center py-3.5 bg-(--text-accent) text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-gray-200">
                                    <BookOpenTextIcon size={16} weight="bold" /> Resume
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-64 border border-dashed border-gray-200 rounded-[32px] flex items-center justify-center text-(--text-gray-light) text-sm f-poppins">
                        No book in progress
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyCarousel;