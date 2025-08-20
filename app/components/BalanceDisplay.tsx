"use client";

import { motion } from "framer-motion";

interface BalanceDisplayProps {
  balance: {
    gems: number;
    usd: number;
  };
  onBuyGems: () => void;
}

export function BalanceDisplay({ balance, onBuyGems }: BalanceDisplayProps) {
  return (
    <div className="bg-surface rounded-lg p-4 shadow-card">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💎</span>
            <div>
              <div className="text-lg font-bold text-primary">{balance.gems.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Gems</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">💵</span>
            <div>
              <div className="text-lg font-bold text-accent">${balance.usd.toFixed(2)}</div>
              <div className="text-sm text-gray-500">USD Balance</div>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBuyGems}
          className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          disabled={balance.usd < 5}
        >
          Buy Gems
        </motion.button>
      </div>
    </div>
  );
}
