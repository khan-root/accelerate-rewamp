const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],

      },
      colors:{
        customBlue:{
          100:'#3da5f4',
          200:'#F6F9FF',
          300:'#F4F2FF',
          500:'#92C9FB',

        },
        customBlack:{
          100:'#000000e6',
          200:'#00000080',
          300:'#535355',
          400:'#546078'
        },
        customPink:{
          100:'#FF9E9E'
        },
        customPurple:{
          100:'#AC9EFF'
        },
        customGray:{
          100:'#f8f9fa',
          200:'#f8f9fe',
        }
      },
      boxShadow: {
        bottom: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
});
