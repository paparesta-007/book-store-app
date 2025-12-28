import React from "react";
import { useNavigate } from "react-router-dom";

interface LiVoiceProps {
  svg: React.ReactNode;
  name: string;
  isActive: boolean;
}

const LiVoice: React.FC<LiVoiceProps> = ({ svg, name, isActive }) => {
  const navigate=useNavigate();
  return (
    <li className="flex sm:flex-row flex-col items-center justify-center gap-1 p-2 rounded-md cursor-pointer"
    onClick={() => {
      const path = name.toLowerCase().replace(" ", "-");
      navigate(path === "discover" ? "/" : `/${path}`);
    }}>
      <span
        className={`
          p-2 rounded-xl
          ${isActive ? 'bg-[var(--olive-green-dark)] text-white' : 'bg-[var(--bg-gray-light)] text-[var(--bg-gray-dark)]'}
        `}
      >
        {svg}
      </span>
      <span
        className={`
          sm:block text-xs sm:text-sm uppercase tracking-[0.2em] font-medium
          ${isActive ? 'text-[var(--olive-green-dark)]' : 'text-[var(--text-gray-dark)]'}
        `}
      >
        {name}
      </span>
    </li>
  );
};

export default LiVoice;
