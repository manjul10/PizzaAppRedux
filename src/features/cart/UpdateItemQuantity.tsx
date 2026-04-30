import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, getCurrentQuantityById, increaseQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ pizzaId }: { pizzaId: number }) => {
  const dispatch = useDispatch();

  //using useSelector to get the quantity for the specific pizza
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <button
        className="inline-block text-sm rounded-full bg-yellow-400 font-semibold
      uppercase tracking-wide text-stone-800 duration-300 hover:bg-yellow-300
      focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2
      disabled:cursor-not-allowed px-2.5 py-1 md:px-3.5 md:py-2"
        onClick={() => dispatch(decreaseQuantity(pizzaId))}
      >
        -
      </button>

      <span className="text-sm font-medium">{currentQuantity}</span>

      <button
        className="inline-block text-sm rounded-full bg-yellow-400 font-semibold
      uppercase tracking-wide text-stone-800 duration-300 hover:bg-yellow-300
      focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2
      disabled:cursor-not-allowed px-2.5 py-1 md:px-3.5 md:py-2"
        onClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
