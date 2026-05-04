import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

const DeleteItemQuantity = ({ pizzaId }: { pizzaId: number }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="inline-block rounded-full bg-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-100 transition-all duration-300 hover:bg-red-900/40 hover:text-red-400 md:px-5 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-95 border border-zinc-700"
      onClick={() => dispatch(deleteItem(pizzaId))}
    >
      Delete
    </button>
  );
};
export default DeleteItemQuantity;