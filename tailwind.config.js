/** @type {import('tailwindcss').Config} */ 
module.exports = {

  content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  enabled: true,
  darkMode: "class",
  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },
  theme: {
      extend: {
          colors: {
              display: ["group-hover"],
              regen: {
                800: "#01a66350",
                600: "#2a4238",
                700: "#22362e",
                900: "#4e5940",
                500: "#416657",//Main
                400: "#347359",
                300: "#27805c",
                200: "#21865d",
                100: "#01a663",
            },

              degen: {
                900: "#fd5f0950",
                800: "#8b817b",
                700: "#b0a8a3",
                600: "#9e7b68",
                500: "#c47042",//Main
                400: "#d76a2f",
                300: "#ea641c",
                200: "#f46112",
                100: "#fd5f09",
              },

              trip: {
                  900: "#C1C0AD",//backgrounnd dark
                  800: "#f7f4b5",
                  700: "#bdbb8d",
                  600: "#9f9c5c",
                  500: "#c4b142",//Error
                  400: "#99ae6a",
                  300: "#b3c390",
                  200: "#cdd7b6",
                  100: "#f0f3e9",//background light
              },
            
          },
          spacing: {
              88: "22rem",
          },
          borderRadius: {
              'lg': '25px',
          },
          fontFamily: {
              work: ['"Work Sans"'],
          },
          container: {
              center: true,
              screens: {
                'hd': '1920px',
                'qhd': '2560px',
                'uhd': '3840px',
              },
          },
      },
  },
};