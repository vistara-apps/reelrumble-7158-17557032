
// Game configuration and logic
export const SYMBOLS = ['🍒', '🍋', '⭐', '💎', '🔔', '7️⃣', '🍀', '👑'];

export const SYMBOL_VALUES = {
  '🍒': 2,
  '🍋': 3,
  '⭐': 5,
  '💎': 10,
  '🔔': 15,
  '7️⃣': 25,
  '🍀': 50,
  '👑': 100,
};

export const WIN_PATTERNS = [
  // Three of a kind
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
];

export interface SpinResult {
  symbols: string[];
  winningPattern: number[] | null;
  payout: number;
  isWin: boolean;
}

export function generateSpinResult(betAmount: number): SpinResult {
  // Generate 9 random symbols (3x3 grid)
  const symbols = Array.from({ length: 9 }, () => {
    const random = Math.random();
    // Adjust probabilities for different symbols
    if (random < 0.3) return SYMBOLS[0]; // Cherry - most common
    if (random < 0.5) return SYMBOLS[1]; // Lemon
    if (random < 0.65) return SYMBOLS[2]; // Star
    if (random < 0.77) return SYMBOLS[3]; // Diamond
    if (random < 0.87) return SYMBOLS[4]; // Bell
    if (random < 0.94) return SYMBOLS[5]; // Seven
    if (random < 0.98) return SYMBOLS[6]; // Clover
    return SYMBOLS[7]; // Crown - rarest
  });

  // Check for winning patterns
  let winningPattern: number[] | null = null;
  let payout = 0;

  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (symbols[a] === symbols[b] && symbols[b] === symbols[c]) {
      winningPattern = pattern;
      const symbolValue = SYMBOL_VALUES[symbols[a] as keyof typeof SYMBOL_VALUES];
      payout = betAmount * symbolValue;
      break;
    }
  }

  return {
    symbols,
    winningPattern,
    payout,
    isWin: payout > 0,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatGems(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount);
}
