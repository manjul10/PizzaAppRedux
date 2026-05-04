const OrderItem = ({ item, isLoadingIngredients, ingredients }: any) => {
  const { quantity, name, totalPrice } = item;
  return (
    <li className="space-y-1 py-4">
      <div className="flex items-center justify-between text-sm sm:text-base">
        <p className="font-bold text-zinc-100">
          <span className="text-orange-500 mr-2 font-black">{quantity}&times;</span>
          {name}
        </p>
        <p className="font-black text-zinc-100">${totalPrice.toFixed(2)}</p>
      </div>
      {ingredients && ingredients.length > 0 ? (
        <p className="text-xs capitalize italic text-zinc-500 font-medium tracking-wide">
          {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
        </p>
      ) : isLoadingIngredients ? (
        <p className="text-xs italic text-zinc-500 font-medium tracking-wide animate-pulse">
          Loading ingredients...
        </p>
      ) : null}
    </li>
  );
};

export default OrderItem;
