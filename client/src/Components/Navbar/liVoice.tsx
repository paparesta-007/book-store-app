import React from "react";
import { useNavigate } from "react-router-dom";

interface LiVoiceProps {
  svg: React.ReactNode;
  name: string;
  isActive: boolean;
  isMinimized: boolean;
}

const LiVoice: React.FC<LiVoiceProps> = ({ svg, name, isActive, isMinimized }) => {
  const navigate=useNavigate();
  return (
    <li className="flex sm:flex-row flex-col items-center transition-all justify-center gap-2 p-2 rounded-md cursor-pointer"
    onClick={() => {
      const path = name.toLowerCase().replace(" ", "-");
      navigate(path === "discover" ? "/" : `/${path}`);
    }}>
      <span
        className={`
          p-2 rounded-xl
          ${isActive ? 'bg-(--text-accent) text-white' : ' text-(--text-primary)'}
        `}
      >
        {svg}
      </span>
      <span
        className={`${isMinimized ? "hidden" : " sm:block "}
         text-xs sm:text-base sm:tracking-[0.05em] f-poppins
          ${isActive ? 'text(--text-accent) font-bold' : 'text-(--text-primary) font-medium'}
        `}
      >
        {name}
      </span>
    </li>
  );
};

export default LiVoice;
