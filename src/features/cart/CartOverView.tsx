import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

const CartOverView = () => {
  const location = useLocation();
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity || location.pathname === "/cart") return null;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center
      justify-between bg-zinc-950 border-t border-zinc-800 px-6 py-5 text-sm uppercase text-zinc-100 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.5)] md:text-base backdrop-blur-md bg-opacity-95"
    >
      <p className="space-x-4 font-bold tracking-widest sm:space-x-6">
        <span className="text-zinc-400">{totalCartQuantity} pizzas</span>
        <span className="text-orange-500 text-lg">${totalCartPrice.toFixed(2)}</span>
      </p>

      <Link to="/cart" className="hover:text-orange-500 font-bold transition-all duration-300 flex items-center gap-2 group">
        Open cart <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
      </Link>
    </div>
  );
};

export default CartOverView;
