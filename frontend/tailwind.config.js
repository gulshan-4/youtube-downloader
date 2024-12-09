/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-red' : '#CD201F',
        "secondary-red": "#BE2E33"
      },
      fontFamily: {
        'hemi-head' :  'hemihead',
        'roboto-reg' :  'roboto-regular',
        'roboto-med' : 'roboto-medium',
        'roboto-bold' : 'roboto-bold',
        'handel-gothic' : 'handelgothic'
      },
    },
  },
  plugins: [],
}
