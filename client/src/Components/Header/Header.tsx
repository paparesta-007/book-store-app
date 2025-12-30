import React from "react";
import UserDropdown from "./UserDropdown";
import { BellIcon } from "@phosphor-icons/react";
import Searchbar from "./Searchbar";

const Header: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50 flex bg-(--bg-primary) py-8 px-8 items-center justify-between gap-6 pb-2">
      <Searchbar />
      <div className="flex items-center gap-6">
        <UserDropdown />
        <BellIcon size={28} className="text-(--text-primary) hidden sm:block" />
      </div>
    </header>
  );
}
export default Header;