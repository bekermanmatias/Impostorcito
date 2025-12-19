"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Vote } from "lucide-react";
import { GameState } from "@/app/page";

interface GameScreenProps {
  gameState: GameState;
  onEndGame: () => void;
}

export default function GameScreen({ gameState, onEndGame }: GameScreenProps) {
  const [timeLeft, setTimeLeft] = useState(gameState.gameTime);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onEndGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft, onEndGame]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (timeLeft / gameState.gameTime) * 100;
  const isLowTime = timeLeft <= 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-accent flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Temporizador */}
        <div className="bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-neon-purple/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock
              className={`w-6 h-6 ${
                isLowTime ? "text-red-400 animate-pulse" : "text-neon-purple"
              }`}
            />
            <h2 className="text-xl font-semibold text-gray-300">Tiempo Restante</h2>
          </div>

          {/* Barra de progreso */}
          <div className="w-full h-3 bg-dark-accent/50 rounded-full overflow-hidden mb-4">
            <motion.div
              className={`h-full rounded-full ${
                isLowTime
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : "bg-gradient-to-r from-neon-purple to-neon-pink"
              }`}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>

          {/* Tiempo */}
          <motion.div
            key={timeLeft}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-center ${
              isLowTime
                ? "text-red-400 animate-pulse"
                : "text-neon-purple"
            }`}
          >
            <div className="text-6xl font-bold font-mono">
              {formatTime(timeLeft)}
            </div>
          </motion.div>

          {/* Botón Pausa/Reanudar */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-full mt-4 py-2 bg-dark-accent/50 hover:bg-dark-accent/70 border border-neon-purple/30 rounded-xl text-sm text-gray-300 transition-colors"
          >
            {isPaused ? "▶ Reanudar" : "⏸ Pausar"}
          </button>
        </div>

        {/* Lista de Jugadores */}
        <div className="bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-neon-purple/20">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-neon-purple" />
            <h2 className="text-xl font-semibold text-neon-purple">
              Jugadores ({gameState.players.length})
            </h2>
          </div>
          <div className="space-y-2">
            {gameState.players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-accent/50 rounded-xl px-4 py-3 border border-neon-purple/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{player.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Información de la Categoría */}
        <div className="bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-4 border border-neon-purple/20 text-center">
          <p className="text-sm text-gray-400">Categoría:</p>
          <p className="text-lg font-semibold text-neon-purple">
            {gameState.category}
          </p>
        </div>

        {/* Botón Terminar */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEndGame}
          className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-red-500/50 transition-all"
        >
          <Vote className="w-6 h-6" />
          ¡Votar / Terminar!
        </motion.button>
      </div>
    </div>
  );
}

