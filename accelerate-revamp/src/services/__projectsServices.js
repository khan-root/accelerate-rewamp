export const calculateDaysLeft = (closingDate) => {
  if (!closingDate || closingDate === "0") {
    return 'continue'; // Default value if closingDate is not provided
  }

  // Convert UNIX timestamp (seconds) to milliseconds
  const closingTimestamp = Number(closingDate) * 1000;

  // Validate the closing date
  if (isNaN(closingTimestamp)) {
    console.error(`Invalid closingDate: ${closingDate}`);
    return 'Invalid date';
  }

  const currentTimestamp = Date.now(); // Current time in milliseconds

  // Calculate days left
  let daysLeft = Math.round((closingTimestamp - currentTimestamp) / (24 * 60 * 60 * 1000));

  if (daysLeft < 0) {
    return 'Overdue';
  }

  return `${daysLeft} days left`;
};



export const getRandomHexColor =()=> {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}