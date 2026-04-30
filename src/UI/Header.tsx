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
    <div className="bg-yellow-500 p-3 text-black justify-between flex items-center">
      <Link to="/">
        <div className="text-2xl font-bold">Pizza App</div>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search order #"
          className="p-1 px-4 rounded-full bg-yellow-100 focus:outline-none
      focus:ring focus:ring-yellow-600 transition-all duration-300 sm:w-64"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>

      {/* 4. Display the username from Redux */}
      <div className="font-semibold hidden md:block">{username}</div>
    </div>
  );
};

export default Header;
