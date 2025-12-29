import { CheckIcon } from "@phosphor-icons/react";
import React from "react";
import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from 'use-debounce';

const Searchbar: React.FC = () => {
    const isFirstRender = useRef(true);
    const navigate= useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 800);
    const [categories, setCategories] = useState([
        { name: "All categories", active: true },
        { name: "Fiction", active: false },
        { name: "Non-fiction", active: false },
        { name: "Sci-Fi", active: false },
        { name: "Fantasy", active: false },
        { name: "Biography", active: false },
        { name: "History", active: false },
        { name: "Children's", active: false },
        { name: "Romance", active: false },
        { name: "Mystery", active: false }
    ]);
    useEffect(() => {
        // Salta il primo render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        
        // Non cercare se il campo è vuoto
        if (debouncedSearchTerm === "") return;
        
       navigate(`/search/${encodeURIComponent(debouncedSearchTerm)}?categories=${categories.filter(c => c.active).map(c => c.name).join(",")}`);
    }, [debouncedSearchTerm,navigate,categories]);
    return (
        <div className="w-full sm:w-[550px] flex sm:flex-row flex-col items-center relative bg-(--bg-secondary) rounded-xl shadow-md p-2 gap-2">
            <button className="text-(--text-gray-light) cursor-pointer hover:bg-(--bg-gray-light) hover:text-black p-2 rounded-lg"
                onClick={() => setIsActive(!isActive)}>
                {
                    (() => {
                        const selected = categories.filter(
                            (c) => c.active && c.name !== "All categories"
                        ).length;
                        if (selected > 0) {
                            return (
                                <span className="flex items-center gap-1">
                                    <div className="bg-red-500 w-5 h-5 flex items-center justify-center text-white p-0 m-0 rounded-full">{selected}</div> selected
                                </span>
                            );
                        }
                        return <span>{categories.find(c => c.active)?.name}</span>;
                    })()
                }
            </button>

            {isActive && <>

                <div className="absolute left-2 px-0.5 animateSlideDown top-full grid sm:grid-cols-2 grid-cols-1 mt-2 w-64 bg-[var(--bg-secondary)] rounded-lg shadow-xl border border-gray-100 py-2 z-20 max-h-60 overflow-y-auto animate-slide-down">
                    {categories.map((category, index) => (
                        <div
                            key={category.name}
                            className={`my-2 flex items-center gap-0.5 text-sm font-semibold cursor-pointer transition-colors ${category.active ? "text-[var(--text-accent)]" : "text-[var(--text-gray-medium)] hover:text-[var(--text-accent)]"
                                } ${index % 2 === 0 ? "border-r border-(--bg-gray-light)" : ""}`}
                            onClick={() => {
                                // Creiamo un nuovo array con il valore invertito
                                const updatedCategories = categories.map((c) =>
                                    c.name === category.name ? { ...c, active: !c.active } : c
                                );
                                setCategories(updatedCategories);
                            }}
                        >
                            <div className="w-5 flex shrink-0 justify-center">
                                {category.active && <CheckIcon size={18} weight="bold" />}
                            </div>
                            {category.name}
                        </div>
                    ))}
                </div>
            </>}
            <div className="w-px h-6 bg-(--bg-gray-light)"></div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for books, authors, genres..."
                className="flex-1 bg-(--bg-secondary) outline-none p-2 rounded-lg f-poppins text-(--text-primary)"
            />
            <button className="bg-(--olive-green-dark) text-white p-2 rounded-lg f-poppins hover:bg-(--olive-green) transition-colors">
                Search
            </button>


        </div>
    );
}
export default Searchbar;