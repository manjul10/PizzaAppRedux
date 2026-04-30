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
        <Link to="/menu" className="text-blue-500 hover:underline">
          &larr; Back to menu
        </Link>
        <p className="mt-7 font-semibold">
          Your cart is still empty. Start adding some pizzas! 🍕
        </p>
      </div>
    );

  return (
    <div className="px-4 py-3">
      <Link
        to="/menu"
        className="text-sm text-blue-500 hover:text-blue-600
      hover:underline"
      >
        &larr; Back to menu
      </Link>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart, {username || "Guest"}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Link
          to="/order/new"
          className="inline-block text-sm rounded-full bg-yellow-400 px-4 py-3
      font-semibold uppercase tracking-wide text-stone-800 duration-300
      hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300
      focus:ring-offset-2"
        >
          Order pizzas
        </Link>

        <button
          onClick={() => dispatch(clearCart())} // 4. Dispatch clearCart
          className="inline-block text-sm rounded-full border-2 border-stone-300
      px-4 py-2.5 font-semibold uppercase tracking-wide text-stone-400 duration-300
      hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring
      focus:ring-stone-200 focus:ring-offset-2"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
