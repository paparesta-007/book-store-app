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
        // CONTENITORE PRINCIPALE: Sfondo a tutto schermo
        // - h-screen w-full: Occupa tutto lo schermo
        // - bg-cover bg-center bg-no-repeat: Gestisce l'immagine di sfondo
        // - flex items-center: Centra verticalmente il contenuto
        // - justify-center sm:justify-end: Centra orizzontalmente su mobile, allinea a destra su desktop
        // - relative: Necessario per posizionare l'overlay e il logo
        <div
            className="min-h-screen h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center sm:justify-end p-4 sm:p-12"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* OVERLAY SCURO */}
            {/* Questo div copre l'immagine per rendere il testo leggibile.
                bg-black/60 significa sfondo nero al 60% di opacità.
            */}
            <div className="absolute inset-0 bg-black/20 z-0"></div>

            {/* LOGO (Posizionato in alto a sinistra sopra l'overlay) */}
            <div className="absolute top-8 left-8 z-20">
                {/* Ho cambiato il colore del testo in bianco per contrastare lo sfondo scuro */}
                <h1 className="text-4xl font-bold f-playfair text-white italic mb-4 drop-shadow-lg">Atena</h1>
            </div>

            {/* CARD DEL MODULO "FLUTTUANTE" */}
            {/* - bg-(--bg-primary): Usa il colore di sfondo del tuo tema
                - rounded-2xl: Bordi molto arrotondati per l'effetto card moderna
                - shadow-2xl: Ombra profonda per l'effetto "fluttuante"
                - z-10: Assicura che stia sopra l'overlay
                - max-w-md w-full: Larghezza massima per non diventare troppo largo su schermi grandi
            */}
            <div className="bg-(--bg-primary) p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md z-10 relative mx-auto sm:mx-0 sm:mr-8 lg:mr-16 border border-(--border-third)/20">
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <h2 className="text-3xl sm:text-4xl font-bold f-poppins text-center text-(--text-accent)">Welcome Back</h2>
                    <p className="mb-6 text-(--text-gray-light) f-poppins text-center">Login to access your personalized book space</p>

                    {/* Bottoni (leggermente adattati per la larghezza della card) */}
                    <button className="w-full py-3 flex items-center gap-3 shadow-md justify-center bg-(--bg-third)
                      text-(--text-gray-dark) font-semibold border border-(--border-third) rounded-full f-poppins
                      hover:bg-(--bg-secondary) transition-all"
                        onClick={() => handleGoogleLogin()}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/960px-Google_Favicon_2025.svg.png"
                            alt="Google image" className="rounded-full w-8 h-8 object-cover" />
                        Login with Google
                    </button>

                    <button className="w-full py-3 flex items-center gap-3 shadow-md justify-center bg-(--bg-third)
                      text-(--text-gray-dark) font-semibold border border-(--border-third) rounded-full f-poppins
                      hover:bg-(--bg-secondary) transition-all"
                        // onClick={() => handleMicrosoftLogin()} // Presumo tu abbia una funzione separata per Microsoft
                        >
                        <img src="https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png"
                            alt="Microsoft image" className="rounded-full w-8 h-8 object-cover" />
                        Login with Microsoft
                    </button>

                    <p className="uppercase tracking-wider text-xs text-(--text-gray-light) mt-8 text-center">
                        Secure login with Google Firebase
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;