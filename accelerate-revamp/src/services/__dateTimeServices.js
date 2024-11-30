export const DMYT = (timestamp) =>{
    const date = new Date(timestamp * 1000); // Convert to milliseconds

    const options = {
    weekday: 'short', // 'Wed'
    year: 'numeric', // '2024'
    month: 'short', // 'Jul'
    day: 'numeric', // '5'
    hour: '2-digit', // '04'
    minute: '2-digit', // '02'
    hour12: true, // 'PM'
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate
}


export const DDY = (unixTimestamp)=>{

   const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Construct the formatted date
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate
}