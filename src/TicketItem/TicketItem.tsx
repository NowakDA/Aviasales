import { FC } from "react";
import "./TicketItem.scss";
import TicketItemInfo from "./TicketItemInfo";
import { Ticket } from "../store/apiSlice";

interface TicketItemProps {
  price: number;
  carrier: string;
  outboundTicket: Ticket["segments"][0];
  returnTicket: Ticket["segments"][1];
}

const TicketItem: FC<TicketItemProps> = ({
  price,
  carrier,
  outboundTicket,
  returnTicket,
}) => {
  const logoUrl = `//pics.avs.io/99/36/${carrier}.png`;

  return (
    <>
      <div className="TicketItem">
        <div className="TicketItem__main">
          <span className="TicketItem__price">{price} ₽</span>
          <img src={logoUrl} alt="CarrierLogo" />
        </div>
        <TicketItemInfo ticket={outboundTicket} />
        <TicketItemInfo ticket={returnTicket} />
      </div>
    </>
  );
};

export default TicketItem;
