import {FC} from "react"


import TicketsSorter from "../TicketsSorter/TicketsSorter.tsx";

import Header from "../Header/Header";
import TransferCheckbox from "../TransferCheckbox/TransferCheckbox.tsx";
import TicketList from "../TicketsList/TicketList";
import "./App.scss";



const App: FC = () => {

  return (
    <>
      <Header />
      
      <div className="grid-container">
        
        <TransferCheckbox />
        <div className="second-column">
          <TicketsSorter />
          <TicketList/>
          
        </div>
      </div>
    </>
  );

}

export default App;
