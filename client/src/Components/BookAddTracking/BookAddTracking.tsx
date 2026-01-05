import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { CalendarBlank, Books, Notebook, ArrowLeft, Timer } from "@phosphor-icons/react";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import "../../assets/datepicker.css";
const BookAddTracking: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState<any>(null);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [chapters, setChapters] = useState<string>("");

    // Calcolo capitoli al giorno
    const calculatePace = () => {
        if (!startDate || !endDate || !chapters || parseInt(chapters) <= 0) return null;
        const days = differenceInDays(endDate, startDate) + 1;
        return (parseInt(chapters) / days).toFixed(1);
        
    };

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        const fetchBooksDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getSingleBook/${id}`);
                const booksData = await response.json();
                setBook(booksData);
            } catch (error) { console.error(error); }
        };
        if (id) fetchBooksDetails();
    }, [id]);

    if (!book) return <div className="h-screen flex items-center justify-center font-serif italic text-gray-400">Loading...</div>;

    const info = book.volumeInfo;
    const pace = calculatePace();

    return (
        <div className=" bg-[var(--bg-primary)] text-[#1a1a1a] selection:bg-[var(--olive-green-light)]">
            {/* Header / Navigation */}
            <nav className="max-w-7xl mx-auto px-6 pt-12 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </button>
            </nav>

            <main className="max-w-7xl mx-auto px-6 md:px-12 ">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

                    {/* LEFT: FORM SECTION */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <header className="mb-16">
                            <div className="flex items-center gap-3 text-[var(--text-accent)] mb-4">
                                <span className="h-[1px] w-8 bg-[var(--text-accent)]"></span>
                                <span className="uppercase tracking-[0.3em] text-[10px] font-black">Plan Tracking</span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6">
                                <img
                                    src={info.imageLinks?.large || info.imageLinks?.medium || info.imageLinks?.thumbnail}
                                    alt={info.title}
                                    className="w-30 h-auto object-cover rounded-sm shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.2)] mb-6"
                                />
                                <div className="flex-1 flex flex-col justify-center">
                                    <h1 className="text-4xl md:text-5xl font-serif font-medium leading-[1.1]">
                                        {info.title}
                                    </h1>
                                    <p className="text-xl text-gray-400 font-light italic">
                                        by {info.authors?.join(", ")}
                                    </p>
                                </div>
                            </div>

                        </header>

                        <div className="space-y-12">
                            {/* Input Capitoli */}
                            <div className="relative border-b border-black/5 focus-within:border-[var(--text-accent)] transition-all pb-4">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">
                                    <Books size={18} weight="light" /> Total Content
                                </label>
                                <input
                                    type="number"
                                    value={chapters}
                                    onChange={(e) => setChapters(e.target.value)}
                                    placeholder="Number of chapters..."
                                    className="w-full bg-transparent text-2xl font-serif outline-none placeholder:text-gray-300
                                    text-(--text-primary)"
                                />
                            </div>

                            {/* Note Personali */}
                            <div className="relative border-b border-black/5 focus-within:border-[var(--text-accent)] transition-all pb-4">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">
                                    <Notebook size={18} weight="light" /> Reading Intentions
                                </label>
                                <textarea
                                    placeholder="Why are you reading this book?..."
                                    rows={1}
                                    
                                    className="w-full h-20 bg-transparent text-md f-poppins outline-none resize-none placeholder:text-gray-200"
                                />
                            </div>

                            {/* Action Button */}
                            <button className="group relative w-full overflow-hidden py-6 bg-[#1a1a1a] text-white rounded-full text-xs font-bold tracking-[0.3em] transition-all hover:bg-black active:scale-95 shadow-2xl shadow-black/20">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    START JOURNEY <ArrowLeft size={16} className="rotate-180" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: CALENDAR & VISUAL SECTION */}
                    <div className="lg:col-span-7 space-y-12">


                        {/* Calendario modernizzato */}
                        <div className="bg-[var(--bg-secondary)] rounded-[2rem] p-8 md:p-12 border border-[var(--border-third)]">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    <CalendarBlank size={20} /> Schedule Reading
                                </h3>
                                {pace && (
                                    <div className="flex items-center gap-2 text-[var(--olive-green-dark)] bg-[var(--olive-green-light)] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter animate-in fade-in zoom-in">
                                        <Timer size={14} weight="bold" /> {pace} chapters / day
                                    </div>
                                )}
                            </div>

                            <div className="modern-calendar-container flex justify-center">
                                <DatePicker
                                    selected={startDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                    minDate={new Date()}
                                    monthsShown={window.innerWidth > 768 ? 2 : 1}
                                />
                            </div>

                            {/* Reading Summary Footer */}
                            {startDate && endDate && (
                                <div className="mt-12 pt-8 border-t border-black/5 flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-gray-300">Target Date</p>
                                        <p className="text-2xl font-serif">{endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-gray-300">Duration</p>
                                        <p className="text-2xl font-serif">{differenceInDays(endDate, startDate) + 1} Days</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default BookAddTracking;