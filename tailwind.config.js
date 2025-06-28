/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "300px",
      md: "400px",
      lg: "880px",
      tablet: "1024px",
    },
    extend: {
      fontFamily: {
        poppins: ["PoppinsRegular", "sans-serif"],
        poppinsBlack: ["PoppinsBlack", "sans-serif"],
        poppinsBlackItalic: ["PoppinsBlackItalic", "sans-serif"],
        poppinsBold: ["PoppinsBold", "sans-serif"],
        poppinsBoldItalic: ["PoppinsBoldItalic", "sans-serif"],
        poppinsExtraBold: ["PoppinsExtraBold", "sans-serif"],
        poppinsExtraBoldItalic: ["PoppinsExtraBoldItalic", "sans-serif"],
        poppinsExtraLight: ["PoppinsExtraLight", "sans-serif"],
        poppinsExtraLightItalic: ["PoppinsExtraLightItalic", "sans-serif"],
        poppinsItalic: ["PoppinsItalic", "sans-serif"],
        poppinsLight: ["PoppinsLight", "sans-serif"],
        poppinsLightItalic: ["PoppinsLightItalic", "sans-serif"],
        poppinsMedium: ["PoppinsMedium", "sans-serif"],
        poppinsMediumItalic: ["PoppinsMediumItalic", "sans-serif"],
        poppinsSemiBold: ["PoppinsSemiBold", "sans-serif"],
        poppinsSemiBoldItalic: ["PoppinsSemiBoldItalic", "sans-serif"],
        poppinsThin: ["PoppinsThin", "sans-serif"],
        poppinsThinItalic: ["PoppinsThinItalic", "sans-serif"],
      },
      colors: {
        primary: "#f6f6f6",
        primaryText: "#FFFFFF",
        secondary: "#EF4444",
        secondaryGren: "#319F43",
        primaryGray: "#c5c5c5",
      },
    },
  },
  plugins: [],
};
