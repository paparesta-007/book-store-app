import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assumendo tu usi React Router
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";

// --- Dati Organizzati per Sezioni ---
const CATEGORY_SECTIONS = [
    {
        title: "Fiction & Narrative",
        items: [
            { id: 1, name: "Classics", img: "https://images.ctfassets.net/qpn1gztbusu2/2G9zk22q3nClGBnP7YI1tC/fe7f2c4bf4eb19738a792e39a6e6cd58/PostBlogIt_libri_classici_da_conoscere.jpg?fm=jpg&w=3840&q=70" },
            { id: 3, name: "Science Fiction", img: "https://miro.medium.com/1*EVIJK6T_EE-LIT5x5QS-OA.jpeg" },
            { id: 4, name: "Fantasy", img: "https://thumbs.dreamstime.com/b/digital-fantasy-illustration-artwork-person-lost-magic-caves-where-strange-weird-trees-grow-145635090.jpg" },
            { id: 9, name: "Thriller", img: "https://fictionary.co/wp-content/uploads/2024/04/blog-title-thriller-genre.png" },
            { id: 10, name: "Horror", img: "https://static.posters.cz/image/750/poster/halloween-horror-i187490.jpg" },
            { id: 8, name: "Romance", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2z3GXYLs4YogU1HSK5F5Pu1Q3knNj9Cfvw&s" },
            { id: 31, name: "Dark Romance", img: "https://images2.alphacoders.com/138/1381464.png" },
            { id: 7, name: "Historical", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQForctTjYWP3MY8aDfXvoOrFmayI36fwh0aw&s" },
            { id: 5, name: "Mystery", img: "https://www.thoughtco.com/thmb/1Yk9Z8W6p3kTg0bX0Z4u6v1j1jQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mystery-58b5f5f53df78c353c4f4a2e.jpg" },
        ]
    },
    {
        title: "Knowledge & Society",
        items: [
            { id: 2, name: "Non-Fiction", img: "https://www.ibs.it/assets/2024/10/20241028112412-attualita-.webp" },
            { id: 6, name: "Biography", img: "https://media.istockphoto.com/id/937809114/photo/old-book-opened-with-pen-and-ink.jpg?s=612x612&w=0&k=20&c=THV_tsHvuqE1zTjlnrPMWBKYkEO4aCS1cQ0_isNGaPU=" },
            { id: 15, name: "Philosophy", img: "https://thestandupphilosophers.co.uk/wp-content/uploads/2021/10/mental-health-g119798c92_1920.jpg" },
            { id: 14, name: "Psychology", img: "https://www.thechicagoschool.edu/insightadmin/2019/11/why-psychology.jpg" },
            { id: 17, name: "Economics", img: "https://www.rit.edu/liberalarts/sites/rit.edu.liberalarts/files/images/paragraph/banner-item-2/Economics_CLA_WebPage_Banner.jpg" },
            { id: 18, name: "Politics", img: "https://idsb.tmgrup.com.tr/ly/uploads/images/2024/01/09/309301.jpg" },
        ]
    },
    {
        title: "Lifestyle & Arts",
        items: [
            { id: 29, name: "Art & Design", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" }, // Placeholder fix
            { id: 27, name: "Travel", img: "https://www.candorblog.com/wp-content/uploads/2017/05/travel-022.jpg" },
            { id: 28, name: "Cooking", img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop" }, // Placeholder fix
            { id: 26, name: "Wellness", img: "https://static.ohga.it/wp-content/uploads/sites/24/2018/09/wellness.jpg" },
            { id: 30, name: "Photography", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" }, // Placeholder fix
        ]
    }
];

const CategoriesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen  text-(--text-primary) pb-24">

            {/* --- HERO HEADER --- */}
            <div className="relative pt-20 pb-12 px-6 md:px-20 border-b border-[var(--border-third)] bg-[var(--bg-secondary)]
            flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-7xl mx-auto">
                    <span className="text-[var(--text-accent)] uppercase tracking-widest text-xs font-bold mb-2 block">
                        Browse Library
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif font-medium mb-8">
                        Explore Genres
                    </h1>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Find a category..."
                            className="w-full bg-[var(--bg-primary)] border border-transparent focus:border-[var(--text-accent)] rounded-full py-3 pl-12 pr-4 outline-none transition-all placeholder:text-gray-400"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <img src="https://assets.ltkcontent.com/images/31018/book-genres_0066f46bde.jpg" alt="Book genre" className=" rounded-lg mt-8" />
                </div>
            </div>

            {/* --- CATEGORIES GRID --- */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 pt-16 space-y-20">
                {CATEGORY_SECTIONS.map((section, index) => (
                    <div key={index}>
                        <div className="flex items-end justify-between mb-8 border-b border-[var(--border-third)] pb-4">
                            <h2 className="text-2xl font-serif italic text-[var(--text-gray-dark)]">
                                {section.title}
                            </h2>
                            <span className="text-xs uppercase font-bold text-gray-400 tracking-widest hidden sm:block">
                                {section.items.length} Collections
                            </span>
                        </div>

                        <div className="flex gap-6 flex-wrap justify-between">
                            {section.items
                                .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((category) => (
                                    <Link
                                        to={`/category/${category.id}`}
                                        key={category.id}
                                        className="group hover:bg-(--bg-secondary) p-4 relative  rounded-xl overflow-hidden
                                        border border-(--text-gray-light) hover:border-transparent cursor-pointer transition-all duration-200"
                                    >
                                        {/* Background Image con Zoom Effect */}
                                        <div className="">
                                            <img
                                                src={category.img}
                                                alt={category.name}
                                                className=" h-full w-80 aspect-[16/9] object-cover rounded-xl"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop"; // Fallback image
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between  items-center mt-4 group">
                                            <h3 className="text-2xl italic font-serif font-medium text-(--text-accent) drop-shadow-lg ">
                                                {category.name}
                                            </h3>
                                            <ArrowRight size={32}  className="text-(--text-accent) opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                        </div>

                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesPage;