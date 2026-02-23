import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Fav = () => {
  const { data, setData } = useContext(RecipeContext);
  const navigate = useNavigate();

  // get only favourite recipes
  const favRecipes = data.filter((recipe) => recipe.fav);

  // remove from favourites
  const removeFromFav = (id) => {
    const copyData = data.map((recipe) =>
      recipe.id === id ? { ...recipe, fav: false } : recipe
    );

    setData(copyData);
    localStorage.setItem("recipes", JSON.stringify(copyData));
    toast.info("Removed from favourites");
  };

  // empty state
  if (favRecipes.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-400">
        <h1 className="text-2xl">No favourites yet 🤍</h1>
        <p>Add some love to recipes!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 px-4">

      {/* ❤️ COUNT HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        ❤️ Favorites ({favRecipes.length})
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {favRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-3 rounded cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/recipes/detail/${recipe.id}`)}
          >
            <h2 className="text-xl font-bold">{recipe.title}</h2>

            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-32 w-full object-cover mt-2 rounded"
              />
            )}

            <p className="text-sm mt-2 text-gray-400">{recipe.chef}</p>

            <button
              className="mt-3 bg-red-800 hover:bg-red-700 px-3 py-1 rounded text-white"
              onClick={(e) => {
                e.stopPropagation(); // prevent card click navigation

                const confirmRemove = window.confirm(
                  "Are you sure you want to remove from favourites?"
                );

                if (confirmRemove) {
                  removeFromFav(recipe.id);
                }
              }}
            >
              Remove ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fav;
