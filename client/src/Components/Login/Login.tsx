import React, { useContext, useEffect } from "react";
import { auth, googleProvider } from "../../library/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, user } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            login(result.user);
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    // URL dell'immagine di sfondo (una biblioteca suggestiva)
    const backgroundImage = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1990&auto=format&fit=crop";

   return (
    <div
        className="min-h-screen h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center lg:justify-between p-6 md:p-12 lg:p-24"
        style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="absolute top-8 left-8 z-20">
            <h1 className="text-4xl font-bold f-playfair text-white italic drop-shadow-lg">Atena</h1>
        </div>

        <div className="z-10 relative hidden lg:flex flex-col max-w-2xl text-left">
            <h1 className="text-white text-7xl font-medium f-playfair italic leading-tight">
                Where everything start...
            </h1>
            <h2 className="text-white/80 text-2xl f-poppins mt-6 font-light">
                Discover your next favorite book with Atena
            </h2>
        </div>

        <div className="bg-(--bg-primary) opacity-90 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md z-10 relative border border-(--border-third)/20">
            <div className="w-full flex flex-col items-center justify-center gap-4">
                <h2 className="text-3xl sm:text-4xl font-bold f-poppins text-center text-(--text-accent)">Welcome Back</h2>
                <p className="mb-6 text-(--text-gray-light) f-poppins text-center">Login to access your personalized book space</p>

                <button 
                    className="w-full py-3.5 flex items-center gap-3 shadow-sm justify-center bg-(--bg-third) text-(--text-gray-dark) font-semibold border border-(--border-third) rounded-full f-poppins hover:bg-(--bg-secondary) transition-all active:scale-95"
                    onClick={() => handleGoogleLogin()}
                >
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/960px-Google_Favicon_2025.svg.png"
                        alt="Google" 
                        className="w-6 h-6 object-contain" 
                    />
                    Login with Google
                </button>

                <button className="w-full py-3.5 flex items-center gap-3 shadow-sm justify-center bg-(--bg-third) text-(--text-gray-dark) 
                font-semibold border border-(--border-third) rounded-full f-poppins hover:bg-(--bg-secondary) transition-all active:scale-95">
                    <img 
                        src="https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png"
                        alt="Microsoft" 
                        className="w-6 h-6 object-contain" 
                    />
                    Login with Microsoft
                </button>

                <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-(--text-gray-light) mt-10 text-center">
                    Secure login with Google Firebase
                </p>
            </div>
        </div>
    </div>
);
};

export default Login;