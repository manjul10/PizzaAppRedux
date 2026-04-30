import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../features/cart/cartSlice";
import DeleteItemQuantity from "../features/cart/DeleteItemQuantity";
import UpdateItemQuantity from "../features/cart/UpdateItemQuantity";

const MenuItem = ({ pizza }) => {
    // if (!pizza) return null;
    console.log(pizza)
  const { id, imageUrl, name, soldOut, ingredients, unitPrice } = pizza;
  const dispatch = useDispatch();
  // useSelector to get the current quantity for this specific pizza
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const handleAddToCart = () => {
    const newItem = {
      id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };
    // dispatch the addItem action
    dispatch(addItem(newItem));
  };
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium text-left">{name}</p>
        <p className="text-sm capitalize italic text-stone-500 text-left">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">${unitPrice.toFixed(2)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity pizzaId={id} />
              <DeleteItemQuantity pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <button
              className="inline-block text-sm rounded-full bg-yellow-400
      font-semibold uppercase tracking-wide text-stone-800 duration-300
      hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300
      focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-2.5"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
