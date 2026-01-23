import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, setData } = useContext(RecipeContext);
  const { register, handleSubmit } = useForm();

  const recipeIndex = data.findIndex((recipe) => params.id == recipe.id);

  const recipe = data[recipeIndex];

  const SubmitHandler = (updatedRecipe) => {
    const copyData = [...data];

    copyData[recipeIndex] = {
      ...copyData[recipeIndex],
      ...updatedRecipe,
      ingr: updatedRecipe.ingr ? updatedRecipe.ingr.split(",") : [],
      inst: updatedRecipe.inst ? updatedRecipe.inst.split(",") : [],
    };

    setData(copyData);
    toast.success("Recipe updated!");
    navigate("/recipes");
  };

  useEffect(() => {
    console.log("SingleRecipe mounted");
    return () => {
      console.log("Cleanup");
    };
  }, []);

  if (!recipe) return "Loading...";

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* LEFT – DETAILS */}
      <div className="w-full lg:w-1/2 lg:sticky top-24">
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
          <h1 className="text-5xl font-black mb-4">{recipe.title}</h1>

          {recipe.image && (
            <img
              className="w-full h-[260px] object-cover rounded-lg"
              src={recipe.image}
              alt={recipe.title}
            />
          )}

          <p className="mt-4 text-red-400 font-semibold">👨‍🍳 {recipe.chef}</p>

          <p className="mt-3 text-gray-300 leading-relaxed">{recipe.desc}</p>
        </div>
      </div>
      {/* RIGHT */}
      <form
        // className="w-1/2 bg-gray-900 p-6 rounded-xl shadow-xl "
        className="w-full lg:w-1/2 bg-gray-900 p-6 rounded-xl shadow-xl"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <input
          // className="block border-b p-2"
          className="block w-full max-w-md mx-auto border-b p-2"

          defaultValue={recipe.image}
          {...register("image")}
        />

        <input
          // className="block border-b p-2"
          className="block w-full max-w-md mx-auto border-b p-2"

          defaultValue={recipe.title}
          {...register("title")}
        />

        <input
          // className="block border-b p-2"
          className="block w-full max-w-md mx-auto border-b p-2"

          defaultValue={recipe.chef}
          {...register("chef")}
        />

        <textarea
          // className="block border-b p-2"
          className="block w-full max-w-md mx-auto border-b p-2"
          defaultValue={recipe.desc}
          {...register("desc")}
        />

        <textarea
          // className="block border-b p-2"
          className="block w-full max-w-md mx-auto border-b p-2"
          defaultValue={
            Array.isArray(recipe.ingr) ? recipe.ingr.join(",") : recipe.ingr
          }
          {...register("ingr")}
        />

        <textarea
          // className="block border-b p-2"
          className="block w-full max-w-md mx-auto border-b p-2"
          defaultValue={
            Array.isArray(recipe.inst) ? recipe.inst.join(",") : recipe.inst
          }
          {...register("inst")}
        />

        <select
          className="mt-5 block border-b p-2 bg-gray-700"
          defaultValue={recipe.category}
          {...register("category")}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="supper">Supper</option>
          <option value="dinner">Dinner</option>
        </select>

        <button className="mt-5 bg-blue-900 px-4 py-2 rounded">
          Update Recipe
        </button>

        <button
          type="button"
          className="mt-5 ml-2 bg-red-900 px-4 py-2 rounded"
          onClick={() => {
            const copyData = data.filter((r) => params.id != r.id);
            setData(copyData);
            toast.success("Recipe deleted!");
            navigate("/recipes");
          }}
        >
          Delete Recipe
        </button>
        <button
          type="button"
          onClick={() => {
            const copyData = [...data];

            copyData[recipeIndex] = {
              ...copyData[recipeIndex],
              fav: !copyData[recipeIndex].fav,
            };

            setData(copyData);
            localStorage.setItem("recipes", JSON.stringify(copyData));
            toast.success("Favourite updated!");
          }}
        >
          {recipe.fav ? "❤️ Remove from Fav" : "🤍 Add to Fav"}
        </button>
      </form>
    </div>
  );
};

export default SingleRecipe;
