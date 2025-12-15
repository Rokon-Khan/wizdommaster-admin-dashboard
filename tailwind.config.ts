import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
            },
            colors: {
                dark: {
                    bg: "#1A1A1A",
                    card: "#282828",
                    hover: "#2A2A2A",
                    border: "#404040",
                },
                accent: {
                    purple: "#A78BFA",
                    blue: "#60A5FA",
                    orange: "#FB923C",
                    pink: "#F472B6",
                },
            },
        },
    },
    plugins: [],
};
export default config;
