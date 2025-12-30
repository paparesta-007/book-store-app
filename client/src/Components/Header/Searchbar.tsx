import { CheckIcon, FadersHorizontalIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from 'use-debounce';

const Searchbar: React.FC = () => {
    const isFirstRender = useRef(true);
    const hasTyped = useRef(false);

    const navigate = useNavigate();
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
        if (hasTyped.current && debouncedSearchTerm.trim() !== "") {
            const cats = categories.filter(c => c.active).map(c => c.name).join(",");
            navigate(`/search/${encodeURIComponent(debouncedSearchTerm)}?categories=${cats}`);

            // Opzionale: resettiamo il trigger dopo la navigazione
            hasTyped.current = false;
        }
    }, [debouncedSearchTerm, navigate, categories]);
    return (
        <div className="w-[90%] sm:w-107.5 flex flex-row items-center relative border border-(--bg-gray-light) bg-[var(--bg-secondary)]
        text-[var(--text-primary)] px-1 rounded-full gap-2">


            <div className="">
                <MagnifyingGlassIcon size={24} weight="light" />
            </div>
            <input
                type="text"
                value={searchTerm}
                onFocus={
                    () => setIsActive(false)
                }
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    hasTyped.current = true;
                }}
                placeholder="Search for books, authors, genres..."
                className=" outline-none p-2 rounded-lg f-poppins text-(--text-primary) min-w-0 flex-1"
            />
            <div className=" h-6 bg-(--bg-gray-light)"></div>
            <button className="text-(--text-gray-light) relative flex  cursor-pointer hover:bg-(--bg-gray-light) hover:text-black p-2 rounded-lg"
            onClick={() => setIsActive(!isActive)}>
                <FadersHorizontalIcon size={24} weight="light" />
                {
                    (() => {
                        const selectedCount = categories.filter(
                            // Conta solo le categorie attive che NON sono "All categories"
                            (c) => c.active && c.name !== "All categories"
                        ).length;

                        if (selectedCount > 0) {
                            return (
                                <span className="flex items-center gap-1">
                                    <div className="bg-red-500 absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-white text-[10px] font-bold rounded-full">
                                        {selectedCount}
                                    </div>
                                </span>
                            );
                        }
                        return null; // Niente pallino se 0 o solo "All categories"
                    })()
                }
            </button>

            {isActive && <>

                <div className="absolute right-2 px-0.5 animateSlideDown top-full grid sm:grid-cols-2 grid-cols-1 mt-2 w-64 bg-[var(--bg-secondary)] rounded-lg shadow-xl border border-gray-100 py-2 z-20 max-h-60 overflow-y-auto animate-slide-down">
                    {categories.map((category, index) => (
                        <div
                            key={category.name}
                            className={`my-2 flex items-center gap-0.5 text-sm font-semibold cursor-pointer transition-colors ${category.active ? "text-[var(--text-accent)]" : "text-[var(--text-gray-medium)] hover:text-[var(--text-accent)]"
                                } ${index % 2 === 0 ? "border-r border-(--bg-gray-light)" : ""}`}
                            onClick={() => {
                                const isAll = category.name === "All categories";
                                setCategories(prev => prev.map(c => {
                                    if (isAll) {
                                        // Attiva/disattiva "All" e spegne gli altri
                                        return { ...c, active: c.name === "All categories" ? !c.active : false };
                                    } else {
                                        // Se clicco altro, "All" deve spegnersi sempre
                                        if (c.name === "All categories") return { ...c, active: false };
                                        return c.name === category.name ? { ...c, active: !c.active } : c;
                                    }
                                }));
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

        </div>
    );
}
export default Searchbar;