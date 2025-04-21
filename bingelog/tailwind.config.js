/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#161925", // app base background
          section: "#1B1F2A", // horizontal scroll areas
          input: "#282B36", // input fields, modals
          button: "#3C3F4A", // neutral button background
        },
        foreground: {
          DEFAULT: "#F5F5F5", // primary text, icons
          secondary: "#C2C1C2", // tab icons, movie metadata
          muted: "#8A8A8E", // placeholder text
          divider: "#646474", // divider lines
        },
        accent: {
          DEFAULT: "#9AD730", // CTA buttons and active elements
        },
        danger: {
          DEFAULT: "#FF4658", // destructive actions (e.g., delete)
        },
      },
    },
    fontFamily: {
      nunitoRegular: ["Nunito-Sans-Regular"],
      nunitoSemiBold: ["Nunito-Sans-SemiBold"],
      nunitoBold: ["Nunito-Sans-Bold"],
      ralewayBold: ["Raleway-Bold"],
    },
  },
  plugins: [],
};
