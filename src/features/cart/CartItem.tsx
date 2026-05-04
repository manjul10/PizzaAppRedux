import DeleteItemQuantity from "./DeleteItemQuantity";
import UpdateItemQuantity from "./UpdateItemQuantity";

const CartItem = ({ item }) => {
  const { id, name, quantity, totalPrice } = item;

  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between border-zinc-800">
      <p className="mb-1 sm:mb-0 font-bold text-zinc-100">
        <span className="text-orange-500 mr-1 font-black">{quantity}&times;</span> {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-base font-bold text-zinc-100 mr-2">${totalPrice.toFixed(2)}</p>

        {/* These components already use Redux internally */}
        <div className="flex items-center gap-3">
          <UpdateItemQuantity pizzaId={id} />
          <DeleteItemQuantity pizzaId={id} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;