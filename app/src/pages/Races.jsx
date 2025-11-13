import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RaceCard from "../components/RaceCard";
import { motion } from "framer-motion";

function Races() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        // Busca perfil do usuário
        const profileRes = await fetch("http://localhost:3000/user/profile", {
          headers: { Authorization: `token ${token}` },
        });
        const profileData = await profileRes.json();

        if (!profileRes.ok) throw new Error(profileData.message);

        setUserData(profileData[0]);

        console.log(userData);

        // Busca corridas
        const racesRes = await fetch("http://localhost:3000/user/races", {
          headers: { Authorization: `token ${token}` },
        });
        const racesData = await racesRes.json();

        if (!racesRes.ok) throw new Error(racesData.message);

        setRaces(racesData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-gray-700 text-lg font-medium animate-pulse">
          Carregando dados...
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg mb-4">
            ⚠️ {errorMessage}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Header com perfil */}
      {userData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-2xl mx-auto mt-8 mb-6 p-6 w-11/12 max-w-3xl flex flex-col sm:flex-row items-center gap-6 border border-blue-100"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="Avatar genérico"
            className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-sm"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-blue-700">
              {userData.name || "Usuário"}
            </h2>
            <p className="text-gray-600">{userData.email}</p>
            <span className="text-xs text-blue-500 bg-blue-100 px-3 py-1 rounded-full mt-2 inline-block font-semibold">
              Run Fast App 🏃‍♂️
            </span>
          </div>
        </motion.div>
      )}

      {/* Título */}
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
        🏁 Minhas Corridas
      </h1>

      {/* Grid de corridas */}
      {races.length === 0 ? (
        <p className="text-center text-gray-600 flex-grow">
          Nenhuma corrida registrada ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto flex-grow px-6 pb-10">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      )}

      {/* Botão de logout */}
      <div className="flex justify-center pb-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Sair da conta 🚪
        </motion.button>
      </div>
    </div>
  );
}

export default Races;