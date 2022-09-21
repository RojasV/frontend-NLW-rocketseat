/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.tsx',
        './index.html',
    ],
    theme: {
        extend: {
            colors: {

            },
            backgroundImage: {
                background: "url('./src/assets/background.png')",
                "nlw-gradient": 'linear-gradient(89.86deg, #9572FC 27.08%, #43E7AD 33.94%, #E1055D 44.57%)',
            }
        },
    },
    plugins: [],
}