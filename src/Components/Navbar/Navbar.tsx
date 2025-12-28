import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav
            className="
        fixed bottom-0 left-0 w-full h-16
        flex items-center justify-around
        bg-(--bg-secondary)
        
        sm:static sm:h-screen sm:w-64
        sm:flex-col sm:justify-start sm:border-t-0 
      "
        >
            <button>Home</button>
            <button>Profile</button>
            <button>Logout</button>
        </nav>
    );
}
export default Navbar;