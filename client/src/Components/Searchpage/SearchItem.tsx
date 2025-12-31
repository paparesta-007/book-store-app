import React from "react";
import { ArrowRightIcon, BookmarkSimpleIcon, BookOpenIcon, ShoppingBagIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const SearchItem: React.FC<{ book: any }> = ({ book }) => {
    const { volumeInfo, saleInfo } = book;
    const navigate = useNavigate();
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
        <div className="group flex flex-col sm:flex-row sm:gap-8 gap-0 sm:p-6 p-0 rounded-4xl transition-all duration-200 
        border
         border-transparent hover:border-(--text-gray-light) cursor-pointer"
            onClick={
                () => {
                    navigate(`/book/${book.id}`);
                }
            }>

            {/* 1. Copertina con ombra profonda e aspect ratio fisso */}
            <div className="shrink-0 self-center sm:self-start">
                <div className="relative w-40 sm:w-48 aspect-2/3 overflow-hidden rounded-2xl">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            {/* 2. Contenuto con spaziatura generosa */}
            <div className="flex flex-col justify-between flex-1 py-1">
                <div className="sm:space-y-4">
                    <div>
                        <h3 className="text-xl sm:text-3xl font-bold font-serif  text-(--text-primary) group-hover:text-(--text-accent) transition-colors">
                            {title}
                        </h3>
                        <p className="sm:block hidden text-sm uppercase tracking-[0.2em] text-(--text-gray-light) font-medium mt-2">
                            {authors ? `by ${authors}` : "Unknown Author"}
                        </p>
                    </div>

                    <p className="sm:block hidden text-(--text-gray-light) leading-relaxed f-poppins text-sm sm:text-base opacity-80 line-clamp-4">
                        {description}
                    </p>
                </div>

                {/* 3. Footer: Prezzo elegante e CTA */}
                <div className="hidden sm:flex items-center justify-between mt-8 pt-6 border-t border-gray-100/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] tracking-[0.2em] font-bold text-(--text-gray-light) uppercase mb-1">
                            {/* Market Price */}
                        </span>
                        <span className="text-2xl font-black text-(--text-primary) f-poppins">
                            {/* {price ? `€${price.toFixed(2)}` : <span className="text-sm font-medium italic opacity-50 text-gray-400">Not for sale</span>} */}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button className="p-3.5 rounded-full border border-black/10 hover:bg-white hover:border-black transition-colors"
                        >
                            <BookmarkSimpleIcon size={24} />
                        </button>
                        <button className="p-3.5 rounded-full border border-black/10 hover:bg-white hover:border-black transition-colors">
                            <ShoppingBagIcon size={22} weight="light" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;