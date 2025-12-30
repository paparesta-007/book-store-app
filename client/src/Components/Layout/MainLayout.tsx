import Navbar from "../Navbar/Navbar";
import Header from "../Navbar/Header/Header";
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
    <div className="min-h-screen bg-(--bg-primary) flex flex-col sm:flex-row">
      <Navbar />

      <main className="flex-1 p-4 flex flex-col items-center">
        <Header />
        <div className="w-full mt-4 flex-1 p-4 rounded-lg border border-gray-400">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
