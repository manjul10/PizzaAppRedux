import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError(); // This hook catches the actual error
  console.log(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-3xl font-bold text-stone-800">
        Something went wrong 🍕
      </h1>

      {/* Shows either the status message or the error text */}
      <p className="mt-4 text-stone-500 italic">
        {error.data || error.message || "Page not found"}
      </p>

      <button
        onClick={() => navigate(-1)} // Takes the user back to where they were
        className="mt-6 text-sm text-blue-500 hover:text-blue-600 hover:underline"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
