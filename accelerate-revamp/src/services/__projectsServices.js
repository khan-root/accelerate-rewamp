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



export const formatDeadlineDifference = (deadlineDate) => {
    if (!deadlineDate) {
        return "Invalid deadline date";
    }

    const currentDate = Math.floor(Date.now() / 1000); // Current date in Unix time (seconds)
    const differenceInSeconds = Math.abs(deadlineDate - currentDate); // Always get the absolute difference
    const differenceInDays = Math.floor(differenceInSeconds / (60 * 60 * 24));

    const years = Math.floor(differenceInDays / 365);
    const remainingDaysAfterYears = differenceInDays % 365;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const days = remainingDaysAfterYears % 30;

    // Create a formatted string
    let result = [];
    if (years > 0) {
        result.push(`${years} year${years > 1 ? "s" : ""}`);
    }
    if (months > 0) {
        result.push(`${months} month${months > 1 ? "s" : ""}`);
    }
    if (days > 0) {
        result.push(`${days} day${days > 1 ? "s" : ""}`);
    }

    return result.join(" ") || "Less than a day";
};
