"use client";

import { useState } from "react";
import LobbyScreen from "@/components/LobbyScreen";
import RoleDistributionScreen from "@/components/RoleDistributionScreen";
import GameScreen from "@/components/GameScreen";
import RevealScreen from "@/components/RevealScreen";
import { gameData } from "@/data";

export type Player = {
  id: string;
  name: string;
  role: "citizen" | "impostor";
};

export type GameState = {
  players: Player[];
  category: string;
  secretWord: string;
  impostorCount: number;
  gameTime: number; // en segundos
};

type Screen = "lobby" | "roles" | "game" | "reveal";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("lobby");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [savedPlayerNames, setSavedPlayerNames] = useState<string[]>([]);

  const handleStartGame = (state: GameState) => {
    // Guardar los nombres de los jugadores para la próxima partida
    const playerNames = state.players.map((p) => p.name);
    setSavedPlayerNames(playerNames);
    // Guardar en localStorage también
    localStorage.setItem("impostorPlayers", JSON.stringify(playerNames));
    
    setGameState(state);
    setCurrentPlayerIndex(0);
    setScreen("roles");
  };

  const handleAllRolesSeen = () => {
    setScreen("game");
  };

  const handleEndGame = () => {
    setScreen("reveal");
  };

  const handlePlayAgain = () => {
    setScreen("lobby");
    setGameState(null);
    setCurrentPlayerIndex(0);
    // Los nombres ya están guardados en savedPlayerNames
  };

  if (screen === "lobby") {
    return <LobbyScreen onStart={handleStartGame} initialPlayers={savedPlayerNames} />;
  }

  if (screen === "roles" && gameState) {
    return (
      <RoleDistributionScreen
        gameState={gameState}
        currentPlayerIndex={currentPlayerIndex}
        onNextPlayer={(index) => setCurrentPlayerIndex(index)}
        onAllSeen={handleAllRolesSeen}
      />
    );
  }

  if (screen === "game" && gameState) {
    return <GameScreen gameState={gameState} onEndGame={handleEndGame} />;
  }

  if (screen === "reveal" && gameState) {
    return <RevealScreen gameState={gameState} onPlayAgain={handlePlayAgain} />;
  }

  return null;
}

