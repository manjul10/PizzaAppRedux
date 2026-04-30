import DeleteItemQuantity from "./DeleteItemQuantity";
import UpdateItemQuantity from "./UpdateItemQuantity";

const CartItem = ({ item }) => {
  const { id, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">${totalPrice.toFixed(2)}</p>

        {/* These components already use Redux internally */}
        <UpdateItemQuantity pizzaId={id} />
        <DeleteItemQuantity pizzaId={id} />
      </div>
    </li>
  );
};

export default CartItem;