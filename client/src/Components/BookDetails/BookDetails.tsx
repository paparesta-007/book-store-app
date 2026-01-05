import { ArrowUpRightIcon, BookmarkSimple, ShareNetwork, ShoppingBag } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails: React.FC = () => {
    const { id } = useParams();
    const [book, setBook] = useState<any>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBooksDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getSingleBook/${id}`);
                const booksData = await response.json();
                setBook(booksData);
            } catch (error) {
                console.error("Errore nel recupero dei dettagli:", error);
            }
        };
        if (id) fetchBooksDetails();
    }, [id]);

    if (!book) return <div className="h-screen flex items-center justify-center font-light tracking-widest uppercase">Loading...</div>;

    const info = book.volumeInfo;
    const thumbnail = info.imageLinks?.extraLarge || info.imageLinks?.large || info.imageLinks?.thumbnail;

    return (
        <div className="min-h-screen text-[#1a1a1a] selection:bg-orange-100">
            {/* --- HERO SECTION --- */}
            <div className=" py-20 px-6 md:px-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-24">
                    
                    {/* Immagine con ombra morbida e profonda */}
                    <div className="flex-shrink-0 w-64 md:w-80 transition-transform duration-500 rotate-0 hover:rotate-1 hover:scale-[1.02]">
                        <img
                            src={thumbnail}
                            alt={info.title}
                            className="w-full h-auto rounded-sm shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)]"
                        />
                    </div>

                    {/* Info Principali */}
                    <div className="flex-1 flex flex-col pt-4">
                        <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight leading-[1.1] mb-6">
                            {info.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 font-light mb-8">
                            by <span className="text-black font-normal border-b border-black/10 pb-1">{info.authors?.join(", ") || "Unknown Author"}</span>
                        </p>
                        
                        <div className="max-w-2xl text-lg text-gray-500 italic leading-relaxed mb-12">
                            {info.subtitle || "Discover a world of profound narratives and hidden secrets."}
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-6 pt-8 border-t justify-between border-black/5">
                            <button className="px-10 py-4 bg-[#1a1a1a] text-white rounded-full text-sm font-semibold tracking-widest hover:bg-black transition-all active:scale-95 flex items-center gap-3"
                            onClick={
                                ()=>navigate("/add-tracking/"+id)
                            }>
                                START READING <ArrowUpRightIcon size={24} />
                            </button>
                            
                            <div className="flex gap-4">
                                <button className="p-3.5 rounded-full border border-black/10 hover:bg-white hover:border-black transition-colors">
                                    <ShoppingBag size={22} weight="light" />
                                </button>
                                <button className="p-3.5 rounded-full border border-black/10 hover:bg-white hover:border-black transition-colors">
                                    <BookmarkSimple size={22} weight="light" />
                                </button>
                                <button className="p-3.5 rounded-full border border-black/10 hover:bg-white hover:border-black transition-colors">
                                    <ShareNetwork size={22} weight="light" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-(--bg-secondary) rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                    
                    {/* Descrizione (8 colonne) */}
                    <div className="md:col-span-8">
                        <h3 className="text-xl  f-poppins font-bold text-(--text-primary) mb-8">Description</h3>
                        <div 
                            className="text-md leading-[1.8] f-poppins text-gray-800  space-y-6"
                            dangerouslySetInnerHTML={{ __html: info.description || "No description available." }}
                        />
                    </div>

                    {/* Dettagli Tecnici (4 colonne) */}
                    <div className="md:col-span-4 space-y-12">
                        <div>
                            <h4 className="text-lg  f-poppins font-bold text-(--text-primary) mb-2">Publisher</h4>
                            <p className="text-md leading-[1.8] f-poppins text-gray-800  space-y-6">{info.publisher || "N/A"}</p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg  f-poppins font-bold text-(--text-primary) mb-2">Language</h4>
                            <p className="text-md leading-[1.8] f-poppins text-gray-800  space-y-6">{info.language?.toUpperCase() || "N/A"}</p>
                        </div>

                        <div>
                            <h4 className="text-lg  f-poppins font-bold text-(--text-primary) mb-2">Paperback</h4>
                            <p className="text-md leading-7">
                                {info.pageCount} pages <br />
                                <span className="text-gray-400 text-sm">ISBN: {info.industryIdentifiers?.[0]?.identifier || "N/A"}</span>
                            </p>
                        </div>

                        {/* Card Recensione Minimal */}
                        <div className="pt-12 mt-12 border-t border-black/5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${info.title}`} alt="user" />
                                </div>
                                <span className="font-bold text-sm">Review by Reader</span>
                            </div>
                            <p className="text-sm italic text-gray-500 leading-relaxed">
                                "An exceptional piece of literature that stays with you long after the final page."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookDetails;