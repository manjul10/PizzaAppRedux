import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError(); // This hook catches the actual error
  console.log(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center bg-zinc-950">
      <h1 className="text-3xl font-bold text-zinc-100 uppercase tracking-tighter">
        Something went <span className="text-orange-500">wrong</span> 🍕
      </h1>

      {/* Shows either the status message or the error text */}
      <p className="mt-4 text-zinc-400 italic font-medium">
        {(error as any).data || (error as any).message || "Page not found"}
      </p>

      <button
        onClick={() => navigate(-1)} // Takes the user back to where they were
        className="mt-8 rounded-full border border-zinc-700 px-6 py-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all duration-300 active:scale-95"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
