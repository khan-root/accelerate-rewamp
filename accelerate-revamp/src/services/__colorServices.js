export const colors = [
  { A: { bg: '#B4F5DE' } },
  { B: { bg: '#BDB3F8' } },
  { C: { bg: '#FEACC0' } },
  { D: { bg: '#DFE590' } },
  { E: { bg: '#E7B6D6' } },
  { F: { bg: '#F69797' } },
  { G: { bg: '#F69797' } },
  { H: { bg: '#F5DBB4' } },
  { I: { bg: '#B3D3F8' } },
  { J: { bg: '#ACE5FE' } },
  { K: { bg: '#EEACFE' } },
  { L: { bg: '#F1F99B' } },
  { M: { bg: '#DFE590' } },
  { N: { bg: '#E5B490' } },
  { O: { bg: '#CEB6E7' } },
  { P: { bg: '#F697E1' } },
  { Q: { bg: '#F7F99B' } },
  { R: { bg: '#B4C2F5' } },
  { S: { bg: '#B3F8EF' } },
  { T: { bg: '#EEACFE' } },
  { U: { bg: '#CAE590' } },
  { V: { bg: '#F99B9B' } },
  { W: { bg: '#E7D3B6' } },
  { X: { bg: '#F6DC97' } },
  { Y: { bg: '#A89BF9' } },
  { Z: { bg: '#F99B9B' } },
];


export function titleNameAlpha (title){
    if(title){

        const firstLetter = title?.charAt(0).toUpperCase();
        const colorObj = colors.find(obj => obj[firstLetter]);
        
        if (colorObj) {
            const { bg: bgColor } = colorObj[firstLetter];
            return {
                firstLetter,
                bgColor,
            };
        }
        
        return {
            firstLetter,
            bgColor: '#000', // Replace with your default color
        };
    }
}

export  const hexToRGBA = (hex, opacity) =>{
  let r = parseInt(hex?.slice(1, 3), 16),
      g = parseInt(hex?.slice(3, 5), 16),
      b = parseInt(hex?.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}