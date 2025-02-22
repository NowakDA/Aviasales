import { intervalToDuration, format, addMinutes } from "date-fns";

const useTicketFormat = () => {
  const formatTransfers = (stops: string[]): string => {
    if (!stops || stops.length === 0) return "Без пересадок";
    if (stops.length === 1) return "1 пересадка";
    return `${stops.length} пересадки`;
  };

  const formatDuration = (totalMins: number): string => {
    const duration = intervalToDuration({ start: 0, end: totalMins * 60000 });
    let result = "";

    if (duration.days && duration.days > 0) {
      result += `${duration.days}д `;
    }
    if (duration.hours && duration.hours > 0) {
      result += `${duration.hours}ч `;
    }
    if (duration.minutes && duration.minutes > 0) {
      result += `${duration.minutes}м`;
    }
    return result;
  };

  const formatTimeFlight = (departureDate: Date | string, flightDuration: number): string => {
    const departure = new Date(departureDate);
    const departureTime = format(departure, "HH:mm");
    const arrivalDate = addMinutes(departure, flightDuration);
    const arrivalTime = format(arrivalDate, "HH:mm");
    return `${departureTime} - ${arrivalTime}`;
  };

  return { formatTransfers, formatDuration, formatTimeFlight };
};

export default useTicketFormat;
