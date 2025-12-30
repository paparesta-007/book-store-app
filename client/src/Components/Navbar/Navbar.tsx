import React from "react";
import LiVoice from "./liVoice";
import { CompassIcon, FolderIcon, ListStarIcon, SidebarSimpleIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const Navbar: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const location=useLocation();
  const {pathname} = location;
   const voices = [
    { id: "discover", name: "Discover", svg: <CompassIcon size={26}   />, path: "/" },
    { id: "my-space", name: "My space", svg: <FolderIcon size={26}   />, path: "/my-space" },
    { id: "categories", name: "Categories", svg: <SquaresFourIcon size={26}   />, path: "/categories" },
    { id: "wishlist", name: "Wishlist", svg: <ListStarIcon size={26}   />, path: "/wishlist" },
  ];

  
  return (
    <nav
      className="
        fixed bottom-4 left-4 right-4
        h-18 flex items-center
        bg-(--bg-primary)
        border-r border-[var(--bg-gray-light)]

        rounded-2xl
        shadow-lg
        sm:static sm:h-screen sm:w-64 
        sm:flex-col sm:justify-start
        sm:rounded-none sm:shadow-none
        sm:left-0 sm:right-auto sm:bottom-0
      "
    >
      <h1 className="hidden f-playfair sm:block italic  tracking-[0.2em] font-bold text-3xl my-6">
        Atena
      </h1>
      <ul className="flex sm:flex-col w-full flex-row items-start justify-evenly sm:justify-start sm:gap-4 sm:pl-6">
         {voices.map((voice) => {
          const isActive =
            voice.path === "/" ? pathname === "/" : pathname.startsWith(voice.path);

          return (
            <LiVoice
              key={voice.id}
              svg={voice.svg}
              name={voice.name}
              isActive={isActive}
            />
          );
        })}
      </ul>
      <hr className="hidden sm:block w-3/4 border-t border-(--bg-gray-light) my-6" />
      <div className="hidden absolute bottom-4 sm:flex gap-2 items-center justify-center "
        onClick={()=>setIsMinimized(!isMinimized)}>
        <SidebarSimpleIcon size={24} />
        <span className={`f-poppins text-(--text-primary) ${isMinimized ? "hidden" : ""}`}>More</span>
      </div>
    </nav>
  );
};

export default Navbar;
