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
          100:'#3da5f4',
          200:'#F6F9FF',
          300:'#F4F2FF',

        },
        black:{
          100:'#000000e6',
          200:'#00000080',
          300:'#535355',
          400:'#546078'
        }
      }
    },
  },
  plugins: [],
});
