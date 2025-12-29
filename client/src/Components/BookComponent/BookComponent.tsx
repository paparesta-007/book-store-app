import { StarIcon } from "@phosphor-icons/react";
import React from "react";

const BookComponent: React.FC<{ book: any }> = ({ book }) => {
    return (
        <div className="flex gap-2 w-100">
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title}
            className="w-36 rounded-sm h-auto shadow-xl" />
            <div className="flex sm:flex-col flex-row justify-between"> 
                <h3 className="text-xl f-poppins font-semibold mt-2">{book.volumeInfo.title}</h3>
                <p className="text-(--text-gray-light) f-poppins">{book.volumeInfo.authors?.join(", ")}</p>
                <div>
                    <StarIcon size={32} color="#eea320" weight="fill" />
                    <span className="f-poppins">{book.averageRating || "N/A"}</span>
                </div>
                <div>
                    Buy for {book.saleInfo?.retailPrice?.amount ? `${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}` : "N/A"}
                </div>
            </div>
        </div>
    );
}

export default BookComponent;