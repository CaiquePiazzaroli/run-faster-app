import { motion } from "framer-motion";
import { Timer, MapPin, Calendar } from "lucide-react";

function RaceCard({ race }) {
  const date = new Date(race.date).toLocaleDateString("pt-BR");

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-linear-to-br from-blue-50 to-blue-100 shadow-md rounded-2xl p-5 border border-blue-100 hover:shadow-xl transition-all duration-300"
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-blue-800 tracking-tight">
          🏃 Corrida #{race.id.slice(0, 5)}
        </h2>
        <span className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded-full shadow-sm">
          {date}
        </span>
      </div>

      {/* Conteúdo principal */}
      <div className="space-y-3 text-gray-700">
        <div className="flex items-center gap-2">
          <Timer className="text-blue-600 w-4 h-4" />
          <p className="font-medium">
            <span className="text-gray-500 font-normal">Tempo:</span>{" "}
            {race.race_time}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="text-blue-600 w-4 h-4" />
          <p className="font-medium">
            <span className="text-gray-500 font-normal">Distância:</span>{" "}
            {race.distance} km
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="text-blue-600 w-4 h-4" />
          <p className="font-medium">
            <span className="text-gray-500 font-normal">Data:</span> {date}
          </p>
        </div>
      </div>

      {/* Rodapé opcional */}
      <div className="mt-4 pt-3 border-t border-blue-200 flex justify-end">
        <span className="text-xs text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full">
          Finalizada ✅
        </span>
      </div>
    </motion.div>
  );
}

export default RaceCard;
