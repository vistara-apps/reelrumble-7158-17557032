# ReelRumble

A slot machine game built on Base with MiniKit.

## Features

- Slot machine game with betting mechanics
- USDC payments on Base using x402
- Farcaster integration with MiniKit

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.local.example` to `.env.local` and fill in the required values:
   ```
   cp .env.local.example .env.local
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Payment Integration

This app uses x402-axios for USDC payments on Base. The payment flow works as follows:

1. User clicks "Buy Gems" button
2. Purchase modal opens with different gem package options
3. User selects a package and clicks "Buy"
4. The app connects to the user's wallet using wagmi's useWalletClient
5. A payment request is created through x402-axios
6. The transaction is signed and sent to the Base network
7. Upon successful payment, gems are added to the user's balance

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: API key for OnchainKit
- `NEXT_PUBLIC_ICON_URL`: URL to the app's icon
- `NEXT_PUBLIC_X402_API_URL`: URL for the x402 API (default: https://api.x402.org)
- `NEXT_PUBLIC_X402_API_KEY`: API key for x402 services

## Testing

To test the payment flow:

1. Make sure you have USDC on Base in your connected wallet
2. Select a gem package in the purchase modal
3. Approve the transaction in your wallet
4. Verify that gems are added to your balance after the transaction is confirmed

