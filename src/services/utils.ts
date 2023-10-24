export const domainName = "http://localhost:3000";

export function getTimeDifference(timestamp: any): string {
    const now = new Date();
    const secondsSinceEpoch = now.getTime() / 1000;
    const secondsSinceTimestamp = secondsSinceEpoch - timestamp.seconds;
    const minutesSinceTimestamp = Math.floor(secondsSinceTimestamp / 60);
    const hoursSinceTimestamp = Math.floor(minutesSinceTimestamp / 60);
    const daysSinceTimestamp = Math.floor(hoursSinceTimestamp / 24);
  
    if (daysSinceTimestamp >= 2) {
      const date = timestamp.toDate();
      return `${date.toLocaleDateString()}, at ${date.toLocaleTimeString()}`;
    } else if (hoursSinceTimestamp >= 1) {
      return `${hoursSinceTimestamp} hour${
        hoursSinceTimestamp > 1 ? 's' : ''
      } ago.`;
    } else if (minutesSinceTimestamp >= 1) {
      return `${minutesSinceTimestamp} minute${
        minutesSinceTimestamp > 1 ? 's' : ''
      } ago.`;
    } else {
      return `Just now`;
    }
  }