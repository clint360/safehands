import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient()

export function getTimeDifference(timestamp: any): string {
  const now = new Date();
  const secondsSinceEpoch = now.getTime() / 1000;
  const secondsSinceTimestamp = secondsSinceEpoch - new Date(timestamp).getTime() / 1000;
  const minutesSinceTimestamp = Math.floor(secondsSinceTimestamp / 60);
  const hoursSinceTimestamp = Math.floor(minutesSinceTimestamp / 60);
  const daysSinceTimestamp = Math.floor(hoursSinceTimestamp / 24);

  if (daysSinceTimestamp >= 2) {
    const date = new Date(timestamp);
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const month = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ][date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const formattedDateTime = `${dayOfWeek}, ${dayOfMonth} ${month} ${year} at ${date.toLocaleTimeString()}`;
    return formattedDateTime;
  } else if (hoursSinceTimestamp >= 1) {
    return `${hoursSinceTimestamp} hour${hoursSinceTimestamp > 1 ? 's' : ''} ago.`;
  } else if (minutesSinceTimestamp >= 1) {
    return `${minutesSinceTimestamp} minute${minutesSinceTimestamp > 1 ? 's' : ''} ago.`;
  } else {
    return 'Just now';
  }
}
  export async function countRowsInTable(tableName: any) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' });
  
      if (error) {
        throw new Error(error.message);
      }
  
      // Access the count result from the response
      const count = data.length > 0 ? data[0].count : 0;
      return count;
    } catch (error) {
      console.error('Error counting rows:', error);
    }
  }

  export function convertDateTime(dateTimeStr: string) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const dateTime = new Date(dateTimeStr);
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateTime.getDay()];
    const month = months[dateTime.getMonth()];
    const dayOfMonth = dateTime.getDate();
    const year = dateTime.getFullYear();
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? parseInt('0' + minutes) : minutes;
    const formattedDateTime = `${dayOfWeek}, ${dayOfMonth} ${month} ${year} at ${hours}:${minutes}${ampm}`;
    return formattedDateTime;
  }

  export async function getLocationName(latitude: number, longitude: number) {
    const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const locationName = data.results[0].formatted;
        return locationName;
      } else {
        return 'Location not found';
      }
    } catch (error) {
      console.error('Error retrieving location:', error);
      return null;
    }
  }