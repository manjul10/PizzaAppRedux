import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import type { AppDispatch } from "../../store";
import { useState } from "react";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { createOrder } from "../../services/apiRestaurant";
import { fetchAddress } from "../user/userSlice";

const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const isSubmitting = navigation.state === "submitting";

  //getDate From Redux
  const {
    username,
    status: addressStatus,
    position,
    error: errorAddress,
    address,
  } = useSelector((state: RootState) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length)
    return (
      <p className="px-4 py-6">Your cart is empty. Go add some pizza! 🍕</p>
    );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const order = {
      ...data,
      cart: cart.map((item) => ({
        ...item,
        pizzaId: item.id, // The API expects pizzaId, not id
      })),
      priority: withPriority,
    };

    try {
      // 2. Use the Service to create the order
      const newOrder = await createOrder(order);

      // 3. IMPORTANT: Clear the cart in Redux after order is successful
      dispatch(clearCart());

      // 4. Navigate to the new order page
      navigate(`/order/${newOrder.id}`);
    } catch {
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="px-4 py-10">
      <h2 className="mb-10 text-2xl font-bold text-zinc-100 uppercase tracking-tighter">Ready to order? <span className="text-orange-500">Let's go!</span></h2>

      <Form onSubmit={onSubmit}>
        <div
          className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center
       text-left"
        >
          <label className="sm:basis-40 font-bold text-zinc-400 uppercase text-xs tracking-widest">First Name</label>
          <input
            className="grow bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3 text-zinc-100
       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 placeholder:text-zinc-600"
            type="text"
            name="customer"
            defaultValue={username}
            required
            placeholder="e.g. John Doe"
          />
        </div>

        <div
          className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center
       text-left"
        >
          <label className="sm:basis-40 font-bold text-zinc-400 uppercase text-xs tracking-widest">Phone number</label>
          <input
            className="grow bg-zinc-900 border border-zinc-800 rounded-full px-6 py-3 text-zinc-100
       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 placeholder:text-zinc-600"
            type="tel"
            name="phone"
            required
            placeholder="e.g. +1 234 567 890"
          />
        </div>

        <div
          className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center
       text-left relative"
        >
          <label className="sm:basis-40 font-bold text-zinc-400 uppercase text-xs tracking-widest">Address</label>
          <div className="grow">
            <input
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-6
       py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 placeholder:text-zinc-600"
              type="text"
              name="address"
              required
              defaultValue={address}
              placeholder="e.g. 123 Street, City"
            />
            {errorAddress && (
              <p className="mt-3 rounded-xl bg-red-950/30 border border-red-900/30 p-3 text-xs font-bold text-red-400">
                {errorAddress}
              </p>
            )}
          </div>

          <span
            className="absolute right-1.25 md:top-7.25 top-8 z-50"
          >
            {!position.latitude && !position.longitude && (
              <button
                type="button"
                disabled={isLoadingAddress}
                className="rounded-full bg-zinc-800 px-4 py-2 text-[10px]
       font-black uppercase tracking-widest text-zinc-100 transition-all duration-300
       hover:bg-zinc-700 disabled:cursor-not-allowed text-center border border-zinc-700 active:scale-95"
                onClick={() => dispatch(fetchAddress())} // 5. Dispatch the Async Thunk
              >
                {isLoadingAddress ? "Locating..." : "Get Position"}
              </button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50">
          <input
            className="h-6 w-6 accent-orange-500 cursor-pointer"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-bold text-zinc-100 cursor-pointer select-none">
            Want to give your order priority? <span className="text-orange-500">(+20% price)</span>
          </label>
        </div>

        <div>
          <button
            disabled={isSubmitting || isLoadingAddress}
            type="submit"
            className="w-full sm:w-auto inline-block rounded-full bg-orange-500 px-8 py-4
       font-black uppercase tracking-widest text-zinc-950 duration-300
       hover:bg-orange-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-lg shadow-orange-500/20 active:scale-95"
          >
            {isSubmitting
              ? "Placing order..."
              : `Order now for
       $${totalPrice.toFixed(2)}`}
          </button>
        </div>
      </Form>
    </div>
  );
};
 
export default CreateOrder;