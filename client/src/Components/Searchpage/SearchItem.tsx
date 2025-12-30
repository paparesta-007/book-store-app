import React from "react";
import { ArrowRightIcon, BookOpenIcon } from "@phosphor-icons/react";

const SearchItem: React.FC<{book: any}> = ({book}) => {
    const { volumeInfo, saleInfo } = book;
    
    // Pulizia e taglio della descrizione (max 400 caratteri)
    const rawDescription = volumeInfo.description?.replace(/<[^>]*>?/gm, '') || "";
    const description = rawDescription.length > 400 
        ? rawDescription.slice(0, 400) + "..." 
        : rawDescription || "No description available for this title.";

    const title = volumeInfo.title;
    const authors = volumeInfo.authors?.join(", ");
    const price = saleInfo?.listPrice?.amount;
    const thumbnail = volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.thumbnail;

    return (
        <div className="group flex flex-col sm:flex-row gap-8 p-6 rounded-4xl transition-all duration-500 bg-(--bg-secondary) ">
            
            {/* 1. Copertina con ombra profonda e aspect ratio fisso */}
            <div className="shrink-0 self-center sm:self-start">
                <div className="relative w-40 sm:w-48 aspect-2/3 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                    <img 
                        src={thumbnail} 
                        alt={title} 
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            {/* 2. Contenuto con spaziatura generosa */}
            <div className="flex flex-col justify-between flex-1 py-1">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold f-poppins text-(--text-primary) leading-tight line-clamp-2 group-hover:text-(--text-accent) transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm uppercase tracking-[0.2em] text-(--text-gray-light) font-medium mt-2">
                            {authors ? `by ${authors}` : "Unknown Author"}
                        </p>
                    </div>

                    <p className="text-(--text-gray-light) leading-relaxed f-poppins text-sm sm:text-base opacity-80 line-clamp-4">
                        {description}
                    </p>
                </div>

                {/* 3. Footer: Prezzo elegante e CTA */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] tracking-[0.2em] font-bold text-(--text-gray-light) uppercase mb-1">
                            Market Price
                        </span>
                        <span className="text-2xl font-black text-(--text-primary) f-poppins">
                            {price ? `€${price.toFixed(2)}` : <span className="text-sm font-medium italic opacity-50 text-gray-400">Not for sale</span>}
                        </span>
                    </div>

                    <button className="flex items-center gap-3 px-8 py-3.5 bg-(--text-primary) text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-gray-200 cursor-pointer">
                        View Details 
                        <ArrowRightIcon weight="bold" size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;