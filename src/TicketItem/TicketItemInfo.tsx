import { FC } from "react";
import useTicketFormat from "../hooks/useTicketFormat";


interface TicketItemInfoProps {
  ticket: {
    origin: string;
    destination: string;
    date: string;
    duration: number;
    stops: string[];
  };
}

const TicketItemInfo: FC<TicketItemInfoProps> = ({ ticket }) => {
    const { formatTransfers, formatDuration, formatTimeFlight } = useTicketFormat();
  return (
    <>
      <div className="ticket-info">
    <div className="info-block">
        <span className="info-block__top">{ticket.origin} - {ticket.destination}</span>
        <span className="info-block__bottom">{formatTimeFlight(ticket.date, ticket.duration)}</span>
    </div>
    <div className="info-block">
        <span className="info-block__top">В Пути</span>
        <span className="info-block__bottom">{formatDuration(ticket.duration)}</span>
    </div>
    <div className="info-block">
        <span className="info-block__top">{formatTransfers(ticket.stops)}</span>
        <span className="info-block__bottom">{ticket.stops.join(" ")}</span>
    </div>
</div>
      
    </>
  );
};

export default TicketItemInfo;
