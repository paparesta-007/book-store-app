import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

const MainLayout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  
  if (!user) {
    return null // oppure un indicatore di caricamento
  }
  return (
    // h-screen e overflow-hidden impediscono a tutta la pagina di scrollare
    <div className="h-screen w-full bg-(--bg-primary) flex flex-col sm:flex-row overflow-hiddenz">
      
      {/* Navbar: ora ha h-full (altezza fissa) */}
      <Navbar />

      {/* main: overflow-y-auto lo rende l'unico elemento che scorre */}
      <main className="flex-1 flex flex-col overflow-y-auto relative">
        
        {/* L'Header deve stare qui dentro per essere sticky rispetto allo scroll di main */}
        <Header />

        {/* Contenuto dell'Outlet */}
        <div className="w-full pb-20 sm:p-6 pt-0 flex-1">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default MainLayout;
