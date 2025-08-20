"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SlotMachineProps {
  isSpinning: boolean;
  onSpin: () => void;
}

const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "🎰"];

export function SlotMachine({ isSpinning, onSpin }: SlotMachineProps) {
  const [reels, setReels] = useState([
    SYMBOLS[0],
    SYMBOLS[1],
    SYMBOLS[2]
  ]);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setReels([
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        ]);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        // Final result
        setReels([
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        ]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card text-center">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">🎰 Slot Machine</h2>
        <p className="text-sm text-gray-500">Match symbols to win!</p>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {reels.map((symbol, index) => (
          <motion.div
            key={index}
            animate={isSpinning ? { y: [-10, 10, -10] } : { y: 0 }}
            transition={{ 
              duration: 0.2, 
              repeat: isSpinning ? Infinity : 0,
              delay: index * 0.1 
            }}
            className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl border-2 border-gray-200"
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSpin}
        disabled={isSpinning}
        className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all ${
          isSpinning
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-accent text-white hover:bg-accent/90 shadow-lg"
        }`}
      >
        {isSpinning ? "Spinning..." : "🎰 SPIN"}
      </motion.button>
    </div>
  );
}
