"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Users, Eye } from "lucide-react";
import confetti from "canvas-confetti";
import { GameState } from "@/app/page";

interface RevealScreenProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

export default function RevealScreen({
  gameState,
  onPlayAgain,
}: RevealScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Configurar confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#a855f7", "#ec4899", "#06b6d4", "#fbbf24"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#a855f7", "#ec4899", "#06b6d4", "#fbbf24"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const impostors = gameState.players.filter((p) => p.role === "impostor");
  const citizens = gameState.players.filter((p) => p.role === "citizen");

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-accent flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Título */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            ¡REVELACIÓN!
          </h1>
        </motion.div>

        {/* Palabra Secreta */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-secondary/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-neon-purple/50 text-center"
        >
          <p className="text-sm text-gray-400 mb-2">La palabra secreta era:</p>
          <h2 className="text-4xl font-bold text-neon-purple mb-2">
            {gameState.secretWord}
          </h2>
          <p className="text-sm text-gray-400">Categoría: {gameState.category}</p>
        </motion.div>

        {/* Impostores */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-red-900/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-semibold text-red-400">
              {impostors.length === 1 ? "El Impostor era:" : "Los Impostores eran:"}
            </h3>
          </div>
          <div className="space-y-2">
            {impostors.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-red-800/30 rounded-xl px-4 py-3 border border-red-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-bold text-white">
                    🎭
                  </div>
                  <span className="text-red-200 font-bold text-lg">
                    {player.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ciudadanos */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-neon-purple/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-neon-purple" />
            <h3 className="text-xl font-semibold text-neon-purple">
              Ciudadanos:
            </h3>
          </div>
          <div className="space-y-2">
            {citizens.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="bg-dark-accent/50 rounded-xl px-4 py-3 border border-neon-purple/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center font-bold text-white">
                    🛡️
                  </div>
                  <span className="text-white font-medium">{player.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Botón Jugar de Nuevo */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlayAgain}
          className="w-full py-5 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-purple-600 hover:to-pink-600 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-neon-purple/50 transition-all"
        >
          <RotateCcw className="w-6 h-6" />
          Jugar de Nuevo
        </motion.button>
      </div>
    </div>
  );
}

