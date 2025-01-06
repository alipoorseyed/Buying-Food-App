// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
        colors: {
            'primary': {
                DEFAULT: '#0054FF',
                50: '#F3F8FF',
                100: '#E7F0FF',
                200: '#C6DCFF',
                300: '#2B79F3',
                400: '#296FFF',
                500: '#00B8D9',
                600: '#0042C7',
                700: '#002F8F',
                800: '#001D57',
                900: '#000A1F'
            },
            'default': {
                DEFAULT: '#DFE3E8',
                50: '#FFFFFF',
                100: '#EEEFF1',
                200: '#FAFAFB',
                300: '#CED2D7',
                400: '#9CA3AF',
                500: '#DFE3E8',
                600: '#E6E8EB',
                700: '#58616C',
                800: '#3F4043',
                900: '#1F2937',
                950: '#151515'
            },
            'success': {
                DEFAULT: '#22C55E',
                50: '#AEF1C6',
                100: '#9CEEBA',
                200: '#79E8A2',
                300: '#57E28A',
                400: '#34DC72',
                500: '#22C55E',
                600: '#1A9547',
                700: '#116530',
                800: '#09351A',
                900: '#010603',
                950: '#000000'
            },
            'danger': {
                DEFAULT: '#DB2777',
                50: '#F5C4DA',
                100: '#F8D4E4',
                200: '#EC90B9',
                300: '#E76DA3',
                400: '#E14A8D',
                500: '#DB2777',
                600: '#831747',
                700: '#7D1543',
                800: '#B71D18',
                900: '#1D050F',
                950: '#050103'
            },
        },
        fontFamily: {
            primaryLight: ['Light'],
            primaryRegular: ['Regular'],
            primaryBold: ['Bold'],
        }
    },
},
  plugins: [],
}
