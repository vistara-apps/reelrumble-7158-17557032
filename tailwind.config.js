
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(204 70% 53%)',
        accent: 'hsl(10 75% 55%)',
        bg: 'hsl(210 36% 96%)',
        surface: 'hsl(210 100% 100%)',
        text: 'hsl(210 42% 28%)',
        'text-muted': 'hsl(210 20% 60%)',
        gold: 'hsl(45 100% 51%)',
        success: 'hsl(120 70% 50%)',
        danger: 'hsl(0 75% 55%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 1px 3px hsla(0, 0%, 0%, 0.08), 0 4px 6px hsla(0, 0%, 0%, 0.08)',
        glow: '0 0 20px hsla(204, 70%, 53%, 0.3)',
        'win-glow': '0 0 30px hsla(45, 100%, 51%, 0.6)',
      },
      animation: {
        'spin-reel': 'spinReel 2s ease-out',
        'win-flash': 'winFlash 0.6s ease-in-out 3',
        'coin-flip': 'coinFlip 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        spinReel: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
        winFlash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        coinFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px hsla(204, 70%, 53%, 0.3)' },
          '50%': { boxShadow: '0 0 40px hsla(204, 70%, 53%, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
