"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { GameState } from "@/app/page";

interface RoleDistributionScreenProps {
  gameState: GameState;
  currentPlayerIndex: number;
  onNextPlayer: (index: number) => void;
  onAllSeen: () => void;
}

export default function RoleDistributionScreen({
  gameState,
  currentPlayerIndex,
  onNextPlayer,
  onAllSeen,
}: RoleDistributionScreenProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentPlayer = gameState.players[currentPlayerIndex];
  const isLastPlayer = currentPlayerIndex === gameState.players.length - 1;
  const allPlayersSeen = currentPlayerIndex >= gameState.players.length;

  // Resetear el estado cuando cambia el jugador - ANTES del render
  useEffect(() => {
    setIsFlipped(false);
    setIsTransitioning(false);
  }, [currentPlayerIndex]);

  const handleReveal = () => {
    setIsFlipped(true);
  };

  const handleHideAndNext = () => {
    // Iniciar transición de salida
    setIsTransitioning(true);
    setIsFlipped(false);
    
    // Esperar a que termine la animación antes de cambiar de jugador
    setTimeout(() => {
      if (isLastPlayer) {
        onAllSeen();
      } else {
        onNextPlayer(currentPlayerIndex + 1);
      }
    }, 300); // Tiempo de la animación de fade out
  };

  if (allPlayersSeen) {
    return null;
  }

  // Usar key única para forzar remount completo cuando cambia el jugador
  const playerKey = `player-${currentPlayerIndex}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-accent flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={playerKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Instrucción */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-neon-purple">
                Pásale el teléfono a
              </h2>
              <h1 className="text-4xl font-bold text-white">
                {currentPlayer.name}
              </h1>
              <p className="text-gray-400 text-sm">
                {currentPlayerIndex + 1} de {gameState.players.length}
              </p>
            </div>

            {/* Botón para revelar */}
            {!isFlipped && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={handleReveal}
                className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-pink rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-neon-purple/50 hover:shadow-neon-purple/70 transition-all"
              >
                <Eye className="w-6 h-6" />
                Soy {currentPlayer.name}, ver mi rol
              </motion.button>
            )}

            {/* Tarjeta con animación flip */}
            <AnimatePresence>
              {isFlipped && (
                <motion.div
                  key={`card-${playerKey}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div
                    className="relative w-full aspect-[3/4]"
                    style={{ perspective: "1000px" }}
                  >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Cara frontal (oculta) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-dark-accent to-dark-secondary border-2 border-neon-purple/50 flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <EyeOff className="w-16 h-16 text-neon-purple/50" />
                  </div>

                  {/* Cara trasera (revelada) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center p-8 text-center"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background:
                        currentPlayer.role === "impostor"
                          ? "linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)"
                          : "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)",
                      borderColor:
                        currentPlayer.role === "impostor"
                          ? "#ef4444"
                          : "#3b82f6",
                    }}
                  >
                    {currentPlayer.role === "impostor" ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="text-6xl mb-4"
                        >
                          🎭
                        </motion.div>
                        <motion.h2
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-3xl font-bold text-red-300 mb-2"
                        >
                          ERES EL
                        </motion.h2>
                        <motion.h1
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-5xl font-black text-red-400 mb-4"
                        >
                          IMPOSTOR
                        </motion.h1>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-red-200 text-sm"
                        >
                          No sabes la palabra secreta
                        </motion.p>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="text-6xl mb-4"
                        >
                          🛡️
                        </motion.div>
                        <motion.h2
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-2xl font-semibold text-blue-300 mb-2"
                        >
                          ERES CIUDADANO
                        </motion.h2>
                        <motion.h1
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-4xl font-bold text-blue-200 mb-2"
                        >
                          {gameState.secretWord}
                        </motion.h1>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-blue-300 text-sm"
                        >
                          Categoría: {gameState.category}
                        </motion.p>
                      </>
                    )}
                    </div>
                  </motion.div>
                </div>

                {/* Botón para ocultar y pasar */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleHideAndNext}
                  className="w-full mt-6 py-4 bg-neon-cyan/20 hover:bg-neon-cyan/30 border border-neon-cyan/50 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <EyeOff className="w-5 h-5 text-neon-cyan" />
                  Ocultar y pasar al siguiente
                  <ArrowRight className="w-5 h-5 text-neon-cyan" />
                </motion.button>
              </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

