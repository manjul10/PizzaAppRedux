import type { RootState } from "@reduxjs/toolkit/query";
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
    } catch (err) {
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form onSubmit={onSubmit}>
        <div
          className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center
       text-left"
        >
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow border border-stone-200 rounded-full px-4 py-2
       focus:outline-none focus:ring focus:ring-yellow-400"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div
          className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center
       text-left"
        >
          <label className="sm:basis-40">Phone number</label>
          <input
            className="input grow border border-stone-200 rounded-full px-4 py-2
       focus:outline-none focus:ring focus:ring-yellow-400"
            type="tel"
            name="phone"
            required
          />
        </div>

        <div
          className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center
       text-left relative"
        >
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full border border-stone-200 rounded-full px-4
       py-2 focus:outline-none focus:ring focus:ring-yellow-400"
              type="text"
              name="address"
              required
            />
            {errorAddress && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          <span
            className="absolute right-[3px] top-[3px] z-50 md:right-[5px]
       md:top-[5px]"
          >
            {!position.latitude && !position.longitude && (
              <button
                type="button"
                disabled={isLoadingAddress}
                className="rounded-full bg-yellow-400 px-3 py-1.5 text-xs
       font-semibold uppercase tracking-wide text-stone-800 transition-all duration-300
       hover:bg-yellow-300 disabled:cursor-not-allowed"
                onClick={() => dispatch(fetchAddress())} // 5. Dispatch the Async Thunk
              >
                {isLoadingAddress ? "Locating..." : "Get Position"}
              </button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority? (+20% price)
          </label>
        </div>

        <div>
          <button
            disabled={isSubmitting || isLoadingAddress}
            type="submit"
            className="inline-block text-sm rounded-full bg-yellow-400 px-4 py-3
       font-semibold uppercase tracking-wide text-stone-800 duration-300
       hover:bg-yellow-300 disabled:cursor-not-allowed"
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