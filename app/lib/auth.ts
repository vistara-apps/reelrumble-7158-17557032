
// Mock authentication system
export interface User {
  userId: string;
  username: string;
  ethAddress: string;
  balanceUSD: number;
  balanceGems: number;
}

export interface GameSession {
  sessionId: string;
  userId: string;
  startTime: number;
  endTime?: number;
  winnings: number;
}

export interface Transaction {
  transactionId: string;
  userId: string;
  type: 'bet' | 'win' | 'purchase';
  amount: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

// Mock user data
const MOCK_USER: User = {
  userId: '1',
  username: 'Player1',
  ethAddress: '0x1234...5678',
  balanceUSD: 10.00,
  balanceGems: 1000,
};

// Simulate authentication
export function authenticateUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER);
    }, 500);
  });
}

// Simulate balance updates
export function updateUserBalance(userId: string, gemsChange: number, usdChange: number = 0): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_USER.balanceGems = Math.max(0, MOCK_USER.balanceGems + gemsChange);
      MOCK_USER.balanceUSD += usdChange;
      resolve({ ...MOCK_USER });
    }, 300);
  });
}

// Simulate gem purchase
export function purchaseGems(userId: string, usdAmount: number): Promise<{ success: boolean; gems: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const gemsToAdd = usdAmount * 100; // 1 USD = 100 gems
      MOCK_USER.balanceUSD = Math.max(0, MOCK_USER.balanceUSD - usdAmount);
      MOCK_USER.balanceGems += gemsToAdd;
      resolve({ success: true, gems: gemsToAdd });
    }, 1000);
  });
}
