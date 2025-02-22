import { useDispatch } from "react-redux";
import { showMoreTickets } from '../store/ticketsSlice'
import './ButtonShowMore.scss'


const ButtonShowMore = () => {
  const dispatch = useDispatch();

    return (
      <button className='btn-show' onClick={() => dispatch(showMoreTickets())}>Показать еще 5 билетов!</button>
    )
  }
  
  export default ButtonShowMore