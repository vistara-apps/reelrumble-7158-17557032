
import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ReelRumble",
  description: "Hit the jackpot with your social casino!",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || "/reel-rumble-hero.png",
      button: {
        title: "Launch ReelRumble",
        action: {
          type: "launch_frame",
          name: "ReelRumble",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE || "/reel-rumble-splash.png",
          splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#3B82F6",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
