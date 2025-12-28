import { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                garamond: ['EB Garamond', 'serif'],
                baskerville: ['Libre Baskerville', 'serif'],
                lora: ['Lora', 'serif'],
                cormorant: ['Cormorant Garamond', 'serif'],
                cinzel: ['Cinzel', 'serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;