/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            spacing: {
                'header-default': 'var(--height-header)',
            },
            height: {
                'header-default': 'var(--height-header)',
            },
            colors: {
                'primary-color': 'var(--primary)',
                'text-color': 'var(--text-color)',
                'text-color-secondnary': 'var(--text-color-secondnary)',
                'text-color-link': 'var(--text-color-link)',
                'background-color': 'var(--background-color)',
                'background-color-secondnary': 'var(--background-color-secondnary)',
                'background-button': 'var(--background-button)',
                'background-button-hightlight': '--background-button-hightlight',
            },
        },
    },
    plugins: [],
};
