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