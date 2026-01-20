import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center gap-x-10 text-sm mb-10">
        <NavLink className={(e)=> e.isActive ? "text-red-300": ""} to="/">
            Home
        </NavLink>
        <NavLink className={(e)=> e.isActive ? "text-red-300": ""} to="/Recipes">
            Recipes
        </NavLink>
        <NavLink className={(e)=> e.isActive ? "text-red-300": ""} to="/About">
            About
        </NavLink>
        <NavLink className={(e)=> e.isActive ? "text-red-300": ""} to="/Create">
            Create Recipes
        </NavLink>
    </div>
  )
}
export default Navbar;

