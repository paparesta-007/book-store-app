import React, { useEffect } from "react";
import LiVoice from "./liVoice";
import { BooksIcon, CompassIcon, FolderIcon, ListStarIcon, SidebarSimpleIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const Navbar: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const voices = [
    { id: "discover", name: "Discover", svg: <CompassIcon size={26} />, path: "/" },
    { id: "my-space", name: "My space", svg: <FolderIcon size={26} />, path: "/my-space" },
    { id: "categories", name: "Categories", svg: <SquaresFourIcon size={26} />, path: "/categories" },
    { id: "wishlist", name: "Wishlist", svg: <ListStarIcon size={26} />, path: "/wishlist" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "\\") {
        e.preventDefault();
        setIsMinimized((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMinimized]);

  return (
    <nav
      className={`
        fixed bottom-4 left-4 right-4
        h-18 flex items-center
        bg-(--bg-secondary)
        border-r border-(--bg-gray-light)
        z-50
        rounded-2xl
        shadow-lg
        sm:static 
        sm:top-0
        sm:h-screen 
        sm:flex-col sm:justify-start
        sm:rounded-none sm:shadow-none
        sm:left-0 sm:right-auto sm:bottom-0
        transition-all duration-300
        ${isMinimized ? "sm:w-28" : "sm:w-64"}
      `}
    >
      <div className="hidden sm:flex justify-center items-center gap-2 ">
        <BooksIcon size={48} weight="light" className="hidden sm:block text-(--text-primary) my-6" />
        {!isMinimized ? (
          <h1 className="hidden f-playfair sm:block italic  tracking-[0.2em] font-bold text-3xl my-6">
            Atena
          </h1>
        ) : null}
      </div>
      <ul className="flex sm:flex-col w-full flex-row items-start justify-evenly sm:justify-start sm:gap-4 sm:px-6">
        {voices.map((voice) => {
          const isActive =
            voice.path === "/" ? pathname === "/" : pathname.startsWith(voice.path);

          return (
            <LiVoice
              key={voice.id}
              svg={voice.svg}
              name={voice.name}
              isActive={isActive}
              isMinimized={isMinimized}
            />
          );
        })}
      </ul>
      <hr className="hidden sm:block w-3/4 border-t border-(--bg-gray-light) my-6" />
      <div className="hidden sm:flex flex-col absolute bottom-4  gap-4"
        onClick={() => setIsMinimized(!isMinimized)}>
          {/* <button className={`flex ${!isMinimized ? "px-6 py-2" : "p-2"} bg-[#6649ad] text-[#edd5ee] items-center rounded-full gap-2`}>
            <SketchLogoIcon size={24} weight="light" /><span className={`f-poppin ${isMinimized ? "hidden" : ""}`}>Upgrade to PRO</span>
          </button> */}
        <div className="flex gap-2 items-center justify-center">
          <SidebarSimpleIcon size={24} className="text-(--text-primary)" />
          <span className={`f-poppins text-(--text-primary) ${isMinimized ? "hidden" : ""}`}>More</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
