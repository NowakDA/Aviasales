import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toggleTransfer } from "../store/ticketsSlice";
import './TransferCheckbox.scss'

function TransferCheckbox() {
  const dispatch = useDispatch();
  const selectedTransfers = useSelector((state: RootState) => state.filter.selectedTransfers);

  const transferOptions = [
    { label: "Все", value: -1 },
    { label: "Без пересадок", value: 0 },
    { label: "1 пересадка", value: 1 },
    { label: "2 пересадки", value: 2 },
    { label: "3 пересадки", value: 3 },
  ];

  return (
    <form className="Transfer-form">
      <span className="Transfer-form__description">Количество пересадок</span>
      {transferOptions.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            className="Transfer-form__checkbox"
            checked={
              option.value === -1
                ? selectedTransfers.length === 4
                : selectedTransfers.includes(option.value)
            }
            onChange={() => dispatch(toggleTransfer(option.value))}
          />
          {option.label}
        </label>
      ))}
    </form>
  );
};

export default TransferCheckbox;