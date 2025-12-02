import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1.5rem",
                    sm: "2rem",
                    lg: "3rem",
                    xl: "4rem",
                },
                screens: {
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1536px",
                },
            },
            fontSize: {
                'xs': ['0.875rem', { lineHeight: '1.5' }],
                'sm': ['1rem', { lineHeight: '1.6' }],
                'base': ['1.125rem', { lineHeight: '1.75' }],
                'lg': ['1.25rem', { lineHeight: '1.75' }],
                'xl': ['1.5rem', { lineHeight: '1.75' }],
                '2xl': ['1.875rem', { lineHeight: '1.4' }],
                '3xl': ['2.25rem', { lineHeight: '1.3' }],
                '4xl': ['3rem', { lineHeight: '1.2' }],
                '5xl': ['3.75rem', { lineHeight: '1.1' }],
                '6xl': ['4.5rem', { lineHeight: '1' }],
                '7xl': ['6rem', { lineHeight: '1' }],
                '8xl': ['8rem', { lineHeight: '1' }],
            },
            colors: {
                primary: {
                    DEFAULT: "#33BBCF",
                    light: "#00F6FF",
                },
                dark: {
                    DEFAULT: "#00040F",
                    secondary: "#010613",
                },
                cyan: {
                    DEFAULT: "#33BBCF",
                    bright: "#00F6FF",
                },
            },
            backgroundImage: {
                "hero-gradient": "linear-gradient(144.39deg, #FFFFFF -278.56%, #6D6D6D -78.47%, #11101D 91.61%)",
                "cyan-gradient": "linear-gradient(135deg, #33BBCF 0%, #00F6FF 100%)",
                "radial-cyan": "radial-gradient(circle, rgba(51, 187, 207, 0.1) 0%, transparent 70%)",
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-slower': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-slowest': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-ultra': 'pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "slide-in-left": "slideInLeft 0.5s ease-out",
                "slide-in-right": "slideInRight 0.5s ease-out",
                "fade-in": "fadeIn 0.5s ease-in",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(51, 187, 207, 0.5), 0 0 10px rgba(51, 187, 207, 0.3)" },
                    "100%": { boxShadow: "0 0 20px rgba(51, 187, 207, 0.8), 0 0 30px rgba(51, 187, 207, 0.5)" },
                },
                slideInLeft: {
                    "0%": { transform: "translateX(-100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideInRight: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
