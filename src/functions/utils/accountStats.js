export function getAccountAgeMessage(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  
  // Calculate difference in milliseconds
  const diffMs = now.getTime() - createdDate.getTime();

  const msInHour = 3600000;
  const msInDay  = 86400000;
  const msInYear = 31536000000;
  
  if (diffMs < msInDay*2) {
    return '** **';
  }

  // Calculate Units
  const years = Math.floor(diffMs / msInYear);
  const days  = Math.floor(diffMs / msInDay);
  const hours = Math.floor(diffMs / msInHour);

  // Select Largest Unit for the message
  let timeStr = "";
  if (years >= 1) {
    timeStr = `${years} year${years > 1 ? 's' : ''}`;
  } else if (days >= 1) {
    timeStr = `${days} day${days > 1 ? 's' : ''}`;
  } else {
    timeStr = `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  return `Thank you for being with us for ${timeStr}`;
}