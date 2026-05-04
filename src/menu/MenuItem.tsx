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
    <li className="flex gap-4 py-4 hover:bg-zinc-900/50 transition-colors duration-200 px-2 rounded-lg">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-md shadow-md ${soldOut ? "opacity-50 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5 md:justify-between items-center md:items-stretch gap-1">
        <p className="font-bold text-zinc-100 text-left text-lg">{name}</p>
        <p className="text-sm capitalize italic text-zinc-400 text-center md:text-left mt-1">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between flex-col md:flex-row">
          {!soldOut ? (
            <p className="text-base font-semibold text-orange-400 mr-1 mb-1">${unitPrice.toFixed(2)}</p>
          ) : (
            <p className="text-sm font-bold uppercase text-zinc-500">
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
              className="inline-block text-xs md:text-sm rounded-full bg-orange-500
      font-bold uppercase tracking-widest text-zinc-950 duration-300
      hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500
      focus:ring-offset-2 focus:ring-offset-zinc-950 px-4 py-2 md:px-5 md:py-2.5 active:scale-95 shadow-lg shadow-orange-500/10"
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
