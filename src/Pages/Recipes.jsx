import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const { data } = useContext(RecipeContext);

  if (!Array.isArray(data)) {
    return <p>Loading recipes...</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-6">

      {/* {data.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))} */}
      {data.length > 0 ? data.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      )) : "No recipes found"}
    </div>
  );
};

export default Recipes;
