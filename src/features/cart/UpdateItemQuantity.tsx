import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, getCurrentQuantityById, increaseQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ pizzaId }: { pizzaId: number }) => {
  const dispatch = useDispatch();

  //using useSelector to get the quantity for the specific pizza
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex  items-center justify-center gap-2 md:gap-3">
      <button
        className="inline-block rounded-full bg-zinc-800 font-bold
      text-zinc-100 duration-300 hover:bg-zinc-700
      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950
      disabled:cursor-not-allowed px-3.5 py-1  md:px-3.5 md:py-2 active:scale-90 md:w-10 md:h-10 sm:w-6 sm:h-6"
        onClick={() => dispatch(decreaseQuantity(pizzaId))}
      >
        -
      </button>

      <span className="text-sm font-bold text-zinc-100">{currentQuantity}</span>

      <button
        className="inline-block rounded-full bg-zinc-800 font-bold
      text-zinc-100 duration-300 hover:bg-zinc-700
      focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950
      disabled:cursor-not-allowed px-3.5 py-1 md:px-3.5 md:py-2 active:scale-90 md:w-10 md:h-10 sm:w-6 sm:h-6"
        onClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
