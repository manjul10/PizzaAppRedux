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
      justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6
      md:text-base"
    >
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice.toFixed(2)}</span>
      </p>

      <Link to="/cart" className="hover:text-stone-100 transition-colors">
        Open cart &rarr;
      </Link>
    </div>
  );
};

export default CartOverView;
