"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useWalletClient } from "wagmi";
import { AppHeader } from "./components/AppHeader";
import { BalanceDisplay } from "./components/BalanceDisplay";
import { SlotMachine } from "./components/SlotMachine";
import { BetControls } from "./components/BetControls";
import { WinDisplay } from "./components/WinDisplay";
import PurchaseModal from "./components/PurchaseModal";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const openUrl = useOpenUrl();
  const { data: walletClient } = useWalletClient();

  // Game state
  const [balance, setBalance] = useState({ gems: 1000, usd: 10.0 });
  const [betAmount, setBetAmount] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [transactions, setTransactions] = useState<string[]>([]);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleSpin = useCallback(async () => {
    if (balance.gems < betAmount || isSpinning) return;

    setIsSpinning(true);
    setBalance(prev => ({ ...prev, gems: prev.gems - betAmount }));

    // Simulate spin duration
    setTimeout(() => {
      // Simple win logic (30% chance)
      const isWin = Math.random() < 0.3;
      const winAmount = isWin ? betAmount * (Math.random() * 4 + 1) : 0;

      if (winAmount > 0) {
        setBalance(prev => ({ ...prev, gems: prev.gems + Math.floor(winAmount) }));
        setLastWin(Math.floor(winAmount));
        setShowWin(true);
        setTimeout(() => setShowWin(false), 3000);
      }

      setIsSpinning(false);
    }, 2000);
  }, [balance.gems, betAmount, isSpinning]);

  const handleBuyGems = useCallback(() => {
    setShowPurchaseModal(true);
  }, []);
  
  const handlePurchase = useCallback(async (amount: number, transactionHash?: string) => {
    setIsProcessingPayment(true);
    
    try {
      // Calculate gems based on amount (1 USD = 100 gems)
      const gemsToAdd = amount * 100;
      
      // Update balance
      setBalance(prev => ({
        ...prev,
        gems: prev.gems + gemsToAdd
      }));
      
      // Store transaction hash if available
      if (transactionHash) {
        setTransactions(prev => [...prev, transactionHash]);
      }
      
      // Close modal
      setShowPurchaseModal(false);
    } catch (error) {
      console.error("Error processing purchase:", error);
    } finally {
      setIsProcessingPayment(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <AppHeader />
      
      <main className="flex-1 p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <BalanceDisplay 
            balance={balance}
            onBuyGems={handleBuyGems}
          />

          <SlotMachine 
            isSpinning={isSpinning}
            onSpin={handleSpin}
          />

          <BetControls
            betAmount={betAmount}
            onBetChange={setBetAmount}
            maxBet={Math.min(balance.gems, 100)}
            disabled={isSpinning}
          />

          {showWin && (
            <WinDisplay 
              amount={lastWin}
              onClose={() => setShowWin(false)}
            />
          )}
        </motion.div>
      </main>

      <footer className="p-4 text-center">
        <button
          onClick={() => openUrl("https://base.org/builders/minikit")}
          className="text-sm text-gray-500 hover:text-primary transition-colors"
        >
          Built on Base with MiniKit
        </button>
      </footer>
      
      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchase={handlePurchase}
        isProcessing={isProcessingPayment}
      />
    </div>
  );
}
