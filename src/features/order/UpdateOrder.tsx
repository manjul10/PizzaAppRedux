import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOrder = ({ order }: any) => {
  const fetcher = useFetcher();

  if (order.priority) return null;
  return (
    <fetcher.Form method="PATCH" className="text-right mt-6">
      <button
        className="inline-block rounded-full bg-orange-500 px-6 py-3
      font-black uppercase tracking-widest text-zinc-950 duration-300
      hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-95 shadow-lg shadow-orange-500/20"
      >
        Make priority
      </button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export async function action({ params }: any) {
  const data = { priority: true };
  await updateOrder(params.id, data);
  return null;
}
