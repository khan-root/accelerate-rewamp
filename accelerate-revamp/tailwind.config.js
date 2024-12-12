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
          600:'#EFF8FF',

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
          100:'#AC9EFF',
          200:'#EFECFF'

        },
        customGray:{
          100:'#f8f9fa',
          200:'#f8f9fe',
          300:'#979797',
          400:'#00000020',
          500:'#BCBCBC',
          600:'#F2F2F9',
        },
        customGreen:{
          100:'#28a745',
          200:"#a4cf30",
          300:'#DBFFF5',
          400:'#47D384'
        },
        customOrange:{
          100:'#fd9a00'
        },
        customRed:{
          100:'#e8384f',
          200:'#FFF0F4',
          300:'#FF4979',
        },
        customYellow:{
          100:'#F0A93D',
          200:'#FDF2E2',
        }
      },
      boxShadow: {
        bottom: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
});
