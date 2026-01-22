import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

const Navbar = () => {
  const { data } = useContext(RecipeContext);
  const favCount = data.filter(r => r.fav).length;

  const base =
    "relative px-3 py-1 transition-all duration-300 hover:text-red-400";

  return (
    <nav className="flex justify-center gap-8 py-6 sticky top-0 backdrop-blur bg-black/40 z-50">
      <NavLink to="/" className={({ isActive }) => isActive ? `${base} text-red-400` : base}>
        Home
      </NavLink>

      <NavLink to="/recipes" className={({ isActive }) => isActive ? `${base} text-red-400` : base}>
        Recipes
      </NavLink>

      <NavLink to="/create" className={({ isActive }) => isActive ? `${base} text-red-400` : base}>
        Create
      </NavLink>

      <NavLink to="/fav" className={({ isActive }) => isActive ? `${base} text-red-400` : base}>
        Fav ❤️
        {favCount > 0 && (
          <span className="ml-1 text-xs bg-red-500 px-2 py-[1px] rounded-full">
            {favCount}
          </span>
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;
