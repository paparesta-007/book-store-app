
import { ShoppingBagIcon } from "lucide-react";
import React from "react";
const BookComponent: React.FC<{ book: any }> = ({ book }) => {
    return (
        <div className="flex sm:flex-row  flex-col gap-2 sm:w-100 w-32">
            <img src={book.volumeInfo.imageLinks?.medium} alt={book.volumeInfo.title}
                className="w-36 rounded-sm h-auto shadow-xl" />
            <div className="flex flex-col justify-between">
                <div className="flex flex-col ">

                    <h3 className="text-base sm:text-xl f-poppins font-bold text-(--text-primary) mt-2">{book.volumeInfo.title}</h3>
                    <p className="hidden sm:block text-(--text-gray-light) italic f-lora">{book.volumeInfo.authors?.join(", ")}</p>
                </div>

                <div>
                    <span className="hidden sm:block uppercase text-(--text-gray-light)">Price</span>
                    <div className="flex items-center gap-2 mt-1 justify-between">
                        <span className="text-lg font-bold text-(--text-primary)">${book.saleInfo.listPrice?.amount || "N/A"}</span>
                        <button className="hidden sm:block bg-(--text-accent) text-white p-2 rounded-xl transition-colors">
                            <ShoppingBagIcon size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookComponent;