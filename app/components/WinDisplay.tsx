"use client";

import { motion } from "framer-motion";

interface WinDisplayProps {
  amount: number;
  onClose: () => void;
}

export function WinDisplay({ amount, onClose }: WinDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-surface rounded-lg p-8 text-center shadow-xl max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        
        <h2 className="text-2xl font-bold text-primary mb-2">Big Win!</h2>
        <p className="text-3xl font-bold text-accent mb-4">+{amount} 💎</p>
        <p className="text-gray-600 mb-6">Congratulations on your win!</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Continue Playing
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
