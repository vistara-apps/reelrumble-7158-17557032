"use client";

import { motion } from "framer-motion";

interface BetControlsProps {
  betAmount: number;
  onBetChange: (amount: number) => void;
  maxBet: number;
  disabled: boolean;
}

export function BetControls({ betAmount, onBetChange, maxBet, disabled }: BetControlsProps) {
  const presetBets = [5, 10, 25, 50];

  return (
    <div className="bg-surface rounded-lg p-4 shadow-card">
      <h3 className="text-lg font-bold text-primary mb-4">Bet Amount</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">💎 {betAmount}</span>
          <input
            type="range"
            min="1"
            max={maxBet}
            value={betAmount}
            onChange={(e) => onBetChange(Number(e.target.value))}
            disabled={disabled}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-sm text-gray-500">Max: {maxBet}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {presetBets.map((amount) => (
            <motion.button
              key={amount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBetChange(amount)}
              disabled={disabled || amount > maxBet}
              className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                betAmount === amount
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } ${(disabled || amount > maxBet) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {amount}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
