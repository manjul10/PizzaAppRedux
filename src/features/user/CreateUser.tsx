import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateName } from "./userSlice";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    // dispatch the action to save the name in Redux
    dispatch(updateName(username));
     navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-zinc-400 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-8 w-72 p-2 px-6 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-zinc-500"
      />

      {username !== "" && (
        <div>
          <button className="inline-block rounded-full bg-orange-500 px-6 py-3 font-bold uppercase tracking-widest text-zinc-950 transition-all duration-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-95 shadow-lg shadow-orange-500/20">
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
