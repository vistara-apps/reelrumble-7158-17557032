"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "../lib/game-logic";
import { useWalletClient } from "wagmi";
import { type WalletClient } from "viem";
import { processPayment } from "../lib/payment-service";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number, transactionHash?: string) => void;
  isProcessing: boolean;
}

const PURCHASE_OPTIONS = [
  { usd: 1, gems: 100, popular: false },
  { usd: 5, gems: 500, popular: true },
  { usd: 10, gems: 1000, popular: false },
  { usd: 20, gems: 2000, popular: false },
];

export default function PurchaseModal({ isOpen, onClose, onPurchase, isProcessing }: PurchaseModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const { data: walletClient } = useWalletClient();

  const handlePurchase = async () => {
    if (!walletClient) {
      setError("Wallet not connected. Please connect your wallet.");
      return;
    }

    setError(null);
    
    try {
      const result = await processPayment({
        amount: selectedAmount,
        walletClient,
        onSuccess: (hash) => {
          console.log("Payment successful with hash:", hash);
        },
        onError: (err) => {
          console.error("Payment failed:", err);
          setError(err.message);
        }
      });
      
      if (result.success) {
        onPurchase(selectedAmount, result.transactionHash);
      } else {
        setError(result.error?.message || "Payment failed");
      }
    } catch (err) {
      console.error("Unexpected error during payment:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-text">Buy Gems</h3>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {PURCHASE_OPTIONS.map((option) => (
                <motion.button
                  key={option.usd}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAmount(option.usd)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 relative ${
                    selectedAmount === option.usd
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-surface border-text/20 text-text hover:border-primary/40'
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{formatCurrency(option.usd)}</div>
                      <div className="text-sm opacity-75">{option.gems} gems</div>
                    </div>
                    <div className="text-2xl">💎</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 btn-secondary"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="flex-1 btn-primary"
              >
                {isProcessing ? 'Processing...' : `Buy for ${formatCurrency(selectedAmount)}`}
              </button>
            </div>

            <p className="text-xs text-text-muted text-center mt-4">
              Secure payment via Base network using USDC
            </p>
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
