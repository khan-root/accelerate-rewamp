export const getTextColor = (hex) => {
    // if (!hex) return '#000000'; // Default fallback
    const r = parseInt(hex?.slice(1, 3), 16);
    const g = parseInt(hex?.slice(3, 5), 16);
    const b = parseInt(hex?.slice(5, 7), 16);

    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    console.log('brightness', brightness)

    return brightness // Black for light bg, White for dark bg
};
export const colors = [
  { A: { bg: '#B4F5DE', text: '#05EB99' } },
  { B: { bg: '#BDB3F8', text: '#5A47E0' } },
  { C: { bg: '#FEACC0', text: '#E0425E' } },
  { D: { bg: '#DFE590', text: '#8A950B' } },
  { E: { bg: '#E7B6D6', text: '#A24B91' } },
  { F: { bg: '#F69797', text: '#D42D2D' } },
  { G: { bg: '#F69797', text: '#D42D2D' } },
  { H: { bg: '#F5DBB4', text: '#D39A53' } },
  { I: { bg: '#B3D3F8', text: '#3580E0' } },
  { J: { bg: '#ACE5FE', text: '#2692E5' } },
  { K: { bg: '#EEACFE', text: '#B032E0' } },
  { L: { bg: '#F1F99B', text: '#B4C907' } },
  { M: { bg: '#DFE590', text: '#8A950B' } },
  { N: { bg: '#E5B490', text: '#A35C24' } },
  { O: { bg: '#CEB6E7', text: '#754CA2' } },
  { P: { bg: '#F697E1', text: '#D42DA3' } },
  { Q: { bg: '#FDF9E5', text: '#A69F33' } },
  { R: { bg: '#B4C2F5', text: '#4A5EE0' } },
  { S: { bg: '#B3F8EF', text: '#2AE0C8' } },
  { T: { bg: '#EEACFE', text: '#B032E0' } },
  { U: { bg: '#CAE590', text: '#73950B' } },
  { V: { bg: '#F99B9B', text: '#D42929' } },
  { W: { bg: '#E7D3B6', text: '#A27842' } },
  { X: { bg: '#F6DC97', text: '#D29B25' } },
  { Y: { bg: '#A89BF9', text: '#5047E0' } },
  { Z: { bg: '#F99B9B', text: '#D42929' } },
];

export function titleNameAlpha (title){
    if(title){

        const firstLetter = title?.charAt(0).toUpperCase();
        const colorObj = colors.find(obj => obj[firstLetter]);
        
        if (colorObj) {
            const { bg: bgColor, text: textColor } = colorObj[firstLetter];
            return {
                firstLetter,
                bgColor,
                textColor
            };
        }
        
        return {
            firstLetter,
            bgColor: '#000', // Replace with your default color,
            textColor: '#EEE'
        };
    }
}

export  const hexToRGBA = (hex, opacity) =>{
  let r = parseInt(hex?.slice(1, 3), 16),
      g = parseInt(hex?.slice(3, 5), 16),
      b = parseInt(hex?.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}