import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Fav = () => {
  const { data, setData } = useContext(RecipeContext);
  const navigate = useNavigate();

  const favRecipes = data.filter((recipe) => recipe.fav);

  const removeFromFav = (id) => {
    const copyData = data.map((recipe) =>
      recipe.id === id ? { ...recipe, fav: false } : recipe
    );

    setData(copyData);
    localStorage.setItem("recipes", JSON.stringify(copyData));
    toast.info("Removed from favourites");
  };

  if (favRecipes.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-400">
        <h1 className="text-2xl">No favourites yet 🤍</h1>
        <p>Add some love to recipes!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {favRecipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border p-3 rounded"
          onClick={() => navigate(`/recipes/detail/${recipe.id}`)}
        >
          <h2 className="text-xl font-bold">{recipe.title}</h2>

          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-32 w-full object-cover mt-2"
            />
          )}

          <p className="text-sm mt-2">{recipe.chef}</p>

          <button
            className="mt-3 bg-red-800 px-3 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation(); // 🔥 stop navigation
              removeFromFav(recipe.id);
            }}
          >
            ❤️ Remove Favourite
          </button>
        </div>
      ))}
    </div>
  );
};

export default Fav;
