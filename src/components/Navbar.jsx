import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";

const Navbar = () => {
  const { data } = useContext(RecipeContext);
  const favCount = data.filter((r) => r.fav).length;
  const [open, setOpen] = useState(false);

  const base =
    "block px-4 py-2 transition-all hover:text-red-400";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/50">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-4 py-4 md:justify-center">
        <h1 className="text-lg font-bold md:hidden">🍳 Recipes</h1>

        {/* HAMBURGER (mobile only) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8">
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
              <span className="ml-1 text-xs bg-red-500 px-2 rounded-full">
                {favCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col border-t border-gray-700 bg-black/90">
          <NavLink onClick={() => setOpen(false)} to="/" className={base}>
            Home
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/recipes" className={base}>
            Recipes
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/create" className={base}>
            Create
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/fav" className={base}>
            Fav ❤️ ({favCount})
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
