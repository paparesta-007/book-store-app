
import React from "react";
const BookComponent: React.FC<{ book: any }> = ({ book }) => {
    return (
        <div className="flex flex-col gap-3 w-32 sm:w-40  group cursor-pointer">
            {/* Contenitore Immagine con Aspect Ratio fisso */}
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-gray-100 shadow-2xl transition-all 
            duration-500  group-hover:-translate-y-1"
             style={{ boxShadow: '0 12px 20px 0 rgba(0,0,0,0.7)' }}>
                <img 
                    src={book.volumeInfo.imageLinks?.medium || book.volumeInfo.imageLinks?.medium} 
                    alt={book.volumeInfo.title}
                    className="h-full w-full object-cover " 
                />
            </div>
            
            {/* Testo con gerarchia chiara */}
            <div className="space-y-1">
                <h3 className="text-sm font-bold leading-tight text-(--text-primary) f-inter line-clamp-2 uppercase tracking-tighter">
                    {book.volumeInfo.title}
                </h3>
                <p className="text-xs text-(--text-gray-light) italic f-poppins">
                    {book.volumeInfo.authors?.[0] || "Unknown Author"}
                </p>
            </div>
        </div>
    );
}

export default BookComponent;