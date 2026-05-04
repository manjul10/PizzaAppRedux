import type { RootState } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const username = useSelector((state: RootState) => state.user.username);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <div className="bg-zinc-950 border-b border-zinc-800 p-4 text-zinc-100 justify-between flex items-center shadow-md">
      <Link to="/">
        <div className="text-2xl font-bold tracking-tighter text-orange-500 uppercase">
          Pizza App
        </div>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search order #"
          className="p-2 px-6 rounded-full bg-zinc-900 border border-zinc-800 text-sm transition-all duration-300 sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-zinc-500"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>

      {/* 4. Display the username from Redux */}
      <div className="font-medium hidden md:block text-zinc-400">
        {username && (
          <span>
            Welcome, <span className="text-zinc-100">{username}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
