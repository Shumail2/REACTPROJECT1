import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

const Recipes = () => {
  const { data } = useContext(RecipeContext);

  const renderrecipes = data.map((recipe) => (
    <div key={recipe.id} className="border-b p-2">
      <h1 className="text-xl font-bold">{recipe.title}</h1>
    </div>
  ));

  return <div>{renderrecipes}</div>;
};

export default Recipes;
