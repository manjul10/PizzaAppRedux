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
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== "" && (
        <div>
          <button className="bg-yellow-400 px-4 py-2 rounded-full font-bold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300">
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
