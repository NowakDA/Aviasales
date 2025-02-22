import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSorter } from "../store/ticketsSlice"
import './TicketsSorter.scss'

const  TicketsSorter = () => {

  const dispatch = useDispatch();
  const selectedSorter = useSelector((state: RootState) => state.filter.selectedSorter);

      return (
    <div className="Sorter-buttons">
      {["cheapest", "fastest", "optimal"].map((type) => (
        <button
          key={type}
          className={`btn ${selectedSorter === type ? "active" : ""}`}
          onClick={() => dispatch(setSorter(type as "cheapest" | "fastest" | "optimal"))}
        >
          {type === "cheapest" ? "Самый дешевый" : type === "fastest" ? "Самый быстрый" : "Оптимальный"}
        </button>
      ))}
    </div>
  );
};


  
  export default TicketsSorter