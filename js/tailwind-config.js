tailwind.config = {
    theme: {
        extend: {
            colors: {
                darkBg: '#040308',
                cardBg: '#0C0816',
                purplePrimary: '#7C3AED',
                purpleBright: '#A855F7',
                purpleSoft: '#C084FC',
                cyanGlow: '#06B6D4'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 5s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-12px) rotate(0.5deg)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                glowPulse: {
                    '0%': { boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)' },
                    '100%': { boxShadow: '0 0 35px rgba(168, 85, 247, 0.5)' }
                }
            }
        }
    }
};