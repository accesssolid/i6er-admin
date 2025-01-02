/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    important: true,
    content: ["./src/**/*.{html,js}", './public/index.html',],
    theme: {
        colors: {
            White: 'var(--defaultWhiteColor)',
            DarkGrey: 'var(--darkGrey)',
            Grey: 'var(--grey)',
            GreySecondary: 'var(--greySecondary)',
            Blue: 'var(--blue)',
            Purple: 'var(--purple)',
            DarkPurple: 'var(--darkPurple)',
            Pink: 'var(--pink)',
            Black: 'var(--black)',
        },
        boxShadow: {
            formShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.05)',
            customShadow: '-1px -2px 28px -14px var(--darkPurple)',
            sideShadow: '2px 0px 15px 0px rgba(0, 0, 0, 0.05)',
            homeCardShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.05)',
            none: 'none',
        },
        fontSize: {
            'para': '1rem',             // 16px (this is the default rem to px conversion)
            'description': '1.1rem',    // 19.2px (corrected from 1.20rem to 1.2rem)
            'descriptionSmall': '1.125rem',// 18px (this is the default rem to px conversion)
            'title20': '1.25rem',       // 20px (this is correct)
            'title24': '1.5rem',        // 24px (this is correct)
            'title26': '1.625rem',      // 26px (corrected to match 26px)
            'title28': '1.75rem',       // 28px (corrected to match 28px)
            'title30': '1.875rem',      // 30px (this is correct)
            'title32': '2rem',      // 30px (this is correct)
            'title36': '2.25rem',       // 36px (this is correct)
        },
        fontFamily: {
            Poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            width: {
                '120': '120px',
                '145': '145px',
                '200': '200px',
                '280': '280px',
                '300': '300px',
                '450': '450px',
                '700': '700px',
                '650': '650px',
                '95': '95%',
            },
            maxWidth: {
                '66': '66px',
                '120': '120px',
                '145': '145px',
                '200': '200px',
            },
            minWidth: {
                '700': '700px',
                '740': '700px',
            },
            height: {
                '700': '700px'
            },
            minHeight: {
                '600': '600px',
                '700': '700px',
            },
            borderRadius: {
                '5': '5px',
                '10': '10px',
                '13': '13px',
                '20': '20px',
            },
            borderColor: {
                'inputBorder': 'rgba(7, 1, 20, 0.10)',
            },
            animation: {
                'spin-slow': 'spin 2.5s linear infinite',
            },
            padding: {
                '50': '50PX'
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(90deg, var(--pink) 0%, var(--darkPurple) 46%, var(--blue) 100%)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}

