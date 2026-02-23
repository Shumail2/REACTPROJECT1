import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { id, image, title, desc, chef, fav } = recipe;

  return (
    <Link
      to={`/recipes/detail/${id}`}
      className="group relative w-full rounded-xl overflow-hidden bg-gray-950 shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-1"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="h-36 sm:h-40 w-full object-cover group-hover:scale-105 transition"
        />
      )}

      <div className="p-4">
        <h2 className="font-bold text-base sm:text-lg">{title}</h2>
        <p className="text-xs text-red-400">⭐ {chef}</p>
         <p>{recipe.category}</p>


        <p className="text-sm mt-2 text-gray-300">
          {desc.slice(0, 40)}…
          <span className="text-blue-400"> more</span>
        </p>
      </div>

      {fav && (
        <span className="absolute top-2 right-2 text-xl">❤️</span>
      )}
    </Link>
  );
};

export default RecipeCard;
