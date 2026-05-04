import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import type { RootState } from "@reduxjs/toolkit/query";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  const username = useSelector((state: RootState) => state.user.username);

  if (!cart.length)
    return (
      <div className="px-4 py-3">
        <Link to="/menu" className="text-orange-500 hover:text-orange-400 font-bold transition-colors">
          &larr; Back to menu
        </Link>
        <p className="mt-7 font-bold text-zinc-100 text-lg">
          Your cart is still empty. Start adding some pizzas! 🍕
        </p>
      </div>
    );

  return (
    <div className="px-4 py-6">
      <Link
        to="/menu"
        className="text-sm text-zinc-400 hover:text-orange-500 font-bold transition-colors uppercase tracking-widest"
      >
        &larr; Back to menu
      </Link>

      <h2 className="mt-7 text-2xl font-bold text-zinc-100 uppercase tracking-tighter">
        Your cart, <span className="text-orange-500">{username || "Guest"}</span>
      </h2>

      <ul className="mt-6 divide-y divide-zinc-800 border-b border-zinc-800">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-8 space-x-4 flex items-center text-center">
        <Link
          to="/order/new"
          className="inline-block rounded-full bg-orange-500 px-2 text-sm md:text-lg md:px-6 py-3
      font-bold uppercase tracking-widest text-zinc-950 duration-300
      hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500
      focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-lg shadow-orange-500/20 active:scale-95"
        >
          Order pizzas
        </Link>

        <button
          onClick={() => dispatch(clearCart())} // 4. Dispatch clearCart
          className="inline-block rounded-full border border-zinc-700
      px-2.5 text-sm md:text-lg md:px-6 py-3 font-bold uppercase tracking-widest text-zinc-400 duration-300
      hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-2
      focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-95"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
