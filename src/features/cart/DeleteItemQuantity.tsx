import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

const DeleteItemQuantity = ({ pizzaId }: { pizzaId: number }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="inline-block text-sm rounded-full bg-yellow-400 font-semibold
      uppercase tracking-wide text-stone-800 duration-300 hover:bg-yellow-300
      focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2
      disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-2.5"
      onClick={() => dispatch(deleteItem(pizzaId))}
    >
      Delete
    </button>
  );
};
export default DeleteItemQuantity;