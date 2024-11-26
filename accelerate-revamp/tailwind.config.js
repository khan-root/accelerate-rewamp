const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],

      },
      colors:{
        blue:{
          100:'#3da5f4'
        }
      }
    },
  },
  plugins: [],
});
