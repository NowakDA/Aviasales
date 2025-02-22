import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchSearchId, fetchTickets } from "../store/apiSlice";
import { selectSortedTickets } from "../store/ticketsSlice.ts";
import TicketItem from "../TicketItem/TicketItem";
import Loader from "../Loader/Loader";
import ButtonShowMore from "../ButtonShowMore/ButtonShowMore.tsx";
import './TicketList.scss'
import noData from '../assets/empty-box.png'

const TicketList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const sortedTickets = useSelector(selectSortedTickets);
  const { visibleTickets } = useSelector((state: RootState) => state.filter);
  const { loading, error, searchId } = useSelector(
    (state: RootState) => state.tickets
  );


  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets(searchId));
    }
  }, [searchId, dispatch]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      {loading && <Loader />}
      {sortedTickets.slice(0, visibleTickets).map((ticket) => {
        const key = `${ticket.carrier}${ticket.segments[0].origin}${ticket.segments[1].date}`;
        return (
          <TicketItem
            key={key}
            price={ticket.price}
            carrier={ticket.carrier}
            outboundTicket={ticket.segments[0]}
            returnTicket={ticket.segments[1]}
          />
        );
      })}
     { sortedTickets.length===0 ? <div className="noTickets">
      <img src={noData}/>
      Нет билетов, соответствующих выбранным параметрам.</div> :<ButtonShowMore />}
    </>
  );
};

export default TicketList;
