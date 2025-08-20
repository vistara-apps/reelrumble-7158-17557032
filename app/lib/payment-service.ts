import { withPaymentInterceptor } from 'x402-axios';
import axios from 'axios';
import { type WalletClient } from 'viem';

// USDC contract address on Base
const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Create x402 client
const createPaymentClient = (walletClient: WalletClient) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_X402_API_URL || 'https://api.x402.org',
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_X402_API_KEY || '',
    },
  });
  
  // Create a wallet adapter for x402
  const wallet = {
    getAddress: async () => {
      const [address] = await walletClient.getAddresses();
      return address;
    },
    signMessage: async (message: string) => {
      return walletClient.signMessage({ message });
    },
    signTransaction: async (transaction: any) => {
      return walletClient.sendTransaction(transaction);
    }
  };
  
  return withPaymentInterceptor(axiosInstance, wallet);
};

export interface PaymentRequest {
  amount: number;  // Amount in USD
  walletClient: WalletClient;
  onSuccess?: (transactionHash: string) => void;
  onError?: (error: Error) => void;
}

export async function processPayment({ 
  amount, 
  walletClient, 
  onSuccess, 
  onError 
}: PaymentRequest): Promise<{ success: boolean; transactionHash?: string; error?: Error }> {
  try {
    const client = createPaymentClient(walletClient);
    
    // Convert USD amount to USDC (1:1 ratio for simplicity)
    const usdcAmount = amount;
    
    // Get the account address from the wallet client
    const [address] = await walletClient.getAddresses();
    
    if (!address) {
      throw new Error('No wallet address found');
    }
    
    // Create payment endpoint with x402 payment requirements
    const paymentEndpoint = `/api/payments/usdc`;
    
    // Make the payment request
    const response = await client.post(paymentEndpoint, {
      token: USDC_BASE_ADDRESS,
      amount: usdcAmount.toString(),
      address: address,
    });
    
    // Check if payment was successful
    if (response.status === 200 && response.data.success) {
      const transactionHash = response.data.transactionHash || '';
      onSuccess?.(transactionHash);
      return { success: true, transactionHash };
    } else {
      throw new Error('Payment failed: ' + (response.data.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    const err = error instanceof Error ? error : new Error('Unknown payment error');
    onError?.(err);
    return { success: false, error: err };
  }
}

// Function to check USDC balance
export async function checkUSDCBalance(walletClient: WalletClient): Promise<number> {
  try {
    const client = createPaymentClient(walletClient);
    const [address] = await walletClient.getAddresses();
    
    if (!address) {
      throw new Error('No wallet address found');
    }
    
    const response = await client.get(`/api/balances/${address}`, {
      params: {
        token: USDC_BASE_ADDRESS
      }
    });
    
    if (response.status === 200 && response.data.balance) {
      return parseFloat(response.data.balance);
    }
    
    return 0;
  } catch (error) {
    console.error('Error checking USDC balance:', error);
    return 0;
  }
}
