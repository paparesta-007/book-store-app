import React from "react";
import UserDropdown from "./UserDropdown";
import { BellIcon } from "@phosphor-icons/react";

const Header: React.FC = () => {
  return (
    <header className="w-full z-50 flex items-center justify-end gap-8 p-2 pb-0">
        <UserDropdown />
        <BellIcon size={28} weight="fill" className="text-(--text-gray-dark)" />
    </header>
  );
}
export default Header;