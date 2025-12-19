"use client";

import { useState, useEffect } from "react";
import { Plus, X, Play } from "lucide-react";
import { GameState } from "@/app/page";
import { gameData, categories } from "@/data";

interface LobbyScreenProps {
  onStart: (gameState: GameState) => void;
  initialPlayers?: string[];
}

export default function LobbyScreen({ onStart, initialPlayers = [] }: LobbyScreenProps) {
  // Inicializar jugadores desde props, localStorage o valores por defecto
  const getInitialPlayers = (): string[] => {
    if (initialPlayers.length > 0) {
      return initialPlayers;
    }
    // Intentar cargar desde localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("impostorPlayers");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          // Si hay error, usar valores por defecto
        }
      }
    }
    return ["", "", ""];
  };

  const [players, setPlayers] = useState<string[]>(() => getInitialPlayers());
  const [category, setCategory] = useState<string>("Aleatoria");
  const [impostorCount, setImpostorCount] = useState<number>(1);
  const [gameTime, setGameTime] = useState<number>(5); // minutos

  // Actualizar jugadores cuando cambien initialPlayers
  useEffect(() => {
    if (initialPlayers.length > 0) {
      setPlayers(initialPlayers);
    }
  }, [initialPlayers]);

  // Guardar en localStorage cuando cambien los jugadores
  useEffect(() => {
    const validPlayers = players.filter((p) => p.trim() !== "");
    if (validPlayers.length > 0 && typeof window !== "undefined") {
      localStorage.setItem("impostorPlayers", JSON.stringify(validPlayers));
    }
  }, [players]);

  const addPlayer = () => {
    setPlayers([...players, ""]);
  };

  const removePlayer = (index: number) => {
    if (players.length > 3) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleStart = () => {
    const validPlayers = players.filter((p) => p.trim() !== "");
    if (validPlayers.length < 3) {
      alert("Necesitas al menos 3 jugadores para comenzar");
      return;
    }

    // Seleccionar categoría
    let selectedCategory = category;
    if (category === "Aleatoria") {
      const randomCategories = categories;
      selectedCategory =
        randomCategories[Math.floor(Math.random() * randomCategories.length)];
    }

    // Seleccionar palabra secreta
    const words = gameData[selectedCategory];
    const secretWord =
      words[Math.floor(Math.random() * words.length)];

    // Asignar roles
    const playerList = validPlayers.map((name, index) => ({
      id: `player-${index}`,
      name: name.trim(),
      role: "citizen" as const,
    }));

    // Asignar impostores aleatoriamente
    const impostorIndices: number[] = [];
    while (impostorIndices.length < impostorCount) {
      const randomIndex = Math.floor(Math.random() * playerList.length);
      if (!impostorIndices.includes(randomIndex)) {
        impostorIndices.push(randomIndex);
      }
    }

    impostorIndices.forEach((index) => {
      playerList[index].role = "impostor";
    });

    const gameState: GameState = {
      players: playerList,
      category: selectedCategory,
      secretWord,
      impostorCount,
      gameTime: gameTime * 60, // convertir a segundos
    };

    onStart(gameState);
  };

  const validPlayersCount = players.filter((p) => p.trim() !== "").length;
  const canStart = validPlayersCount >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-accent flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            EL IMPOSTOR
          </h1>
          <p className="text-gray-400 text-sm">
            Juego de deducción social
          </p>
        </div>

        {/* Jugadores */}
        <div className="bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-neon-purple/20">
          <h2 className="text-xl font-semibold text-neon-purple flex items-center gap-2">
            <span>Jugadores</span>
            <span className="text-sm text-gray-400">
              ({validPlayersCount}/∞)
            </span>
          </h2>
          <div className="space-y-3">
            {players.map((player, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer(index, e.target.value)}
                  placeholder={`Jugador ${index + 1}`}
                  className="flex-1 bg-dark-accent/50 border border-neon-purple/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                />
                {players.length > 3 && (
                  <button
                    onClick={() => removePlayer(index)}
                    className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-colors"
                  >
                    <X className="w-5 h-5 text-red-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addPlayer}
            className="w-full py-3 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/50 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5 text-neon-purple" />
            <span className="text-neon-purple font-medium">Agregar Jugador</span>
          </button>
        </div>

        {/* Configuración */}
        <div className="bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-neon-purple/20">
          <h2 className="text-xl font-semibold text-neon-purple">
            Configuración
          </h2>

          {/* Categoría */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-dark-accent/50 border border-neon-purple/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent"
            >
              <option value="Aleatoria">Aleatoria</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-dark-accent">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Impostores */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Impostores</label>
            <div className="flex gap-3">
              {[1, 2].map((count) => (
                <button
                  key={count}
                  onClick={() => setImpostorCount(count)}
                  className={`flex-1 py-3 rounded-xl border transition-all ${
                    impostorCount === count
                      ? "bg-neon-purple/30 border-neon-purple text-neon-purple font-semibold"
                      : "bg-dark-accent/50 border-neon-purple/30 text-gray-400 hover:border-neon-purple/50"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Tiempo */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Tiempo (minutos)</label>
            <div className="flex gap-3">
              {[3, 5, 7, 10].map((time) => (
                <button
                  key={time}
                  onClick={() => setGameTime(time)}
                  className={`flex-1 py-3 rounded-xl border transition-all ${
                    gameTime === time
                      ? "bg-neon-purple/30 border-neon-purple text-neon-purple font-semibold"
                      : "bg-dark-accent/50 border-neon-purple/30 text-gray-400 hover:border-neon-purple/50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Botón Comenzar */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            canStart
              ? "bg-gradient-to-r from-neon-purple to-neon-pink hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-neon-purple/50"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Play className="w-6 h-6" />
          COMENZAR
        </button>

        {!canStart && (
          <p className="text-center text-sm text-red-400">
            Necesitas al menos 3 jugadores
          </p>
        )}
      </div>
    </div>
  );
}

