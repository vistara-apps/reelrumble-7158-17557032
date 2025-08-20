import { createX402Client } from 'x402-axios';
import { type WalletClient } from 'wagmi';

// USDC contract address on Base
const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Create x402 client
const createPaymentClient = () => {
  return createX402Client({
    baseURL: process.env.NEXT_PUBLIC_X402_API_URL || 'https://api.x402.org',
    apiKey: process.env.NEXT_PUBLIC_X402_API_KEY,
  });
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
    const x402Client = createPaymentClient();
    
    // Convert USD amount to USDC (1:1 ratio for simplicity)
    const usdcAmount = amount;
    
    // Get the account address from the wallet client
    const [address] = await walletClient.getAddresses();
    
    if (!address) {
      throw new Error('No wallet address found');
    }
    
    // Create payment request
    const paymentRequest = await x402Client.createPaymentRequest({
      token: USDC_BASE_ADDRESS,
      amount: usdcAmount.toString(),
      from: address,
    });
    
    if (!paymentRequest || !paymentRequest.id) {
      throw new Error('Failed to create payment request');
    }
    
    // Sign and send the transaction
    const { request } = await x402Client.getTransactionRequest(paymentRequest.id);
    
    if (!request) {
      throw new Error('Failed to get transaction request');
    }
    
    // Send the transaction using the wallet client
    const hash = await walletClient.sendTransaction({
      to: request.to as `0x${string}`,
      data: request.data as `0x${string}`,
      value: BigInt(request.value || 0),
    });
    
    // Wait for transaction confirmation
    const receipt = await x402Client.waitForTransactionReceipt(hash);
    
    if (receipt.status === 'success') {
      onSuccess?.(hash);
      return { success: true, transactionHash: hash };
    } else {
      throw new Error('Transaction failed');
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
    const x402Client = createPaymentClient();
    const [address] = await walletClient.getAddresses();
    
    if (!address) {
      throw new Error('No wallet address found');
    }
    
    const balance = await x402Client.getTokenBalance({
      token: USDC_BASE_ADDRESS,
      address,
    });
    
    return parseFloat(balance);
  } catch (error) {
    console.error('Error checking USDC balance:', error);
    return 0;
  }
}

