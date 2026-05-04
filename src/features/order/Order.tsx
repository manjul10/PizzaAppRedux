import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import { calcMinutesLeft, formatDate } from "../../utils/helper.ts";
import OrderItem from "./OrderItem.tsx";
import UpdateOrder from "./UpdateOrder.tsx";
import { useEffect } from "react";

const Order = () => {
  const order = useLoaderData() as any;
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tighter">
          Order <span className="text-orange-500">#{id}</span> status
        </h2>

        <div className="space-x-3 flex items-center">
          {priority && (
            <span
              className="rounded-full bg-red-950/50 border border-red-900/50 px-4 py-1.5 text-xs font-black
     uppercase tracking-widest text-red-400 shadow-sm shadow-red-500/10"
            >
              Priority
            </span>
          )}
          <span
            className="rounded-full bg-emerald-950/50 border border-emerald-900/50 px-4 py-1.5 text-xs font-black
     uppercase tracking-widest text-emerald-400 shadow-sm shadow-emerald-500/10"
          >
            {status} order
          </span>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/50 border border-zinc-800
     px-8 py-6 rounded-2xl shadow-inner"
      >
        <p className="font-bold text-zinc-100 text-lg">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-zinc-500 font-medium">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-zinc-800 border-b border-t border-zinc-800">
        {cart.map((item: any) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher?.data?.find((el: any) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      <div className="space-y-3 bg-zinc-900/30 rounded-2xl p-8 border border-zinc-800/50">
        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
          Price pizza: <span className="text-zinc-100">${orderPrice.toFixed(2)}</span>
        </p>
        {priority && (
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
            Price priority: <span className="text-zinc-100">${priorityPrice.toFixed(2)}</span>
          </p>
        )}
        <p className="text-xl font-black text-zinc-100 uppercase tracking-tighter pt-2 border-t border-zinc-800">
          To pay on delivery: <span className="text-orange-500">${(orderPrice + priorityPrice).toFixed(2)}</span>
        </p>
      </div>
      {!priority && <UpdateOrder order={order}/>}
    </div>
  );
};

export async function loader({ params }: any) {
  const order = await getOrder(params.id);
  return order;
}

export default Order;
