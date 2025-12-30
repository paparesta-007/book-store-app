import { GearIcon, InfoIcon, SignOutIcon, SketchLogoIcon, UserIcon } from "@phosphor-icons/react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useContext, useEffect, useState } from "react";
import { googleProvider,auth } from "../../../library/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
interface UserDropdownProps {
    nome?: string;
}

const UserDropdown: React.FC<UserDropdownProps> = () => {
    const userContext=useContext(UserContext);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const naviagate=useNavigate ();
    const iniziale = userName ? userName.charAt(0).toUpperCase() : "U";
    
    useEffect(() => {
        if (userContext.user) {
            const fullName = userContext.user.displayName;
            const firstName = fullName ? fullName.split(" ")[0] : "User";
            console.log("User's first name:", firstName);
            setUserName(firstName)
            setImageUrl(userContext.user.photoURL);
        }
    }, [userContext.user]);
    const handleLogout = async () => {
        try {
            console.log("Logging out...");
            
            await auth.signOut();
            userContext.logout();

            naviagate("/login");
            
            // Eventuali azioni aggiuntive dopo il logout, come la reindirizzamento
        } catch (error) {
            console.error("Errore durante il logout:", error);
        }
    }
    return (
        <div className="relative f-poppins inline-block">
            <button className="flex items-center gap-2 focus:outline-none group"
                onClick={() => {
                    // Placeholder per l'apertura del dropdown
                    setIsOpen(!isOpen);
                }}>
                {/* Avatar Section */}
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`Avatar di ${userName}`}
                        className="w-10 h-10 shadow rounded-full object-cover cursor-pointer border border-gray-200"
                    />
                ) : (
                    <div
                        className="w-10 h-10 shadow rounded-full cursor-pointer flex items-center justify-center text-white font-bold uppercase shrink-0"
                        style={{ backgroundColor: "var(--text-accent)" }}
                    >
                        {iniziale}
                    </div>
                )}

                {/* Nome Utente visibile */}
                <span className="text-base font-medium text-(--text-primary) group-hover:text-[var(--text-accent)]">
                    {userName}
                </span>

                {/* Icona */}
                <CaretDownIcon size={18} weight="bold" className={isOpen ? "rotate-[-180deg] transition-all" : "transition-all"} />
            </button>
            {isOpen && <div className=" animateSlideDown">
                {/* Dropdown Menu Placeholder */}
                <a href="#" className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-gray-200 rounded-md shadow-lg py-2 z-50 ">
                    <div className="px-4 py-2 flex gap-2 items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <UserIcon size={24} weight="bold" />Profile
                    </div>
                    <div className="px-4 py-2 flex gap-2 items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <GearIcon size={24} weight="bold" />Settings
                    </div>
                    <div className="px-4 py-2 flex gap-2 items-center text-sm text-violet-600 hover:bg-gray-100 cursor-pointer">
                        <SketchLogoIcon size={24} weight="bold" />Upgrade to <span className="bg-violet-700 text-white rounded-full font-semibold px-1 py-0.5">Pro</span>
                    </div>
                    <hr className="my-2 border-t border-gray-300 mx-2" />
                    <div className="px-4 py-2 flex gap-2 items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <InfoIcon size={24} weight="fill" />About
                    </div>
                    <div className="px-4 py-2 flex gap-2 items-center text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
                        onClick={()=>handleLogout()}>
                        <SignOutIcon size={24} weight="bold" />Logout
                    </div>
                </a>
            </div>
            }
        </div>
    );
};

export default UserDropdown;