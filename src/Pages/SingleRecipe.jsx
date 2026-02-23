import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useContext(RecipeContext);
  const { register, handleSubmit } = useForm();

  const recipeIndex = data.findIndex((r) => r.id == id);
  const recipe = data[recipeIndex];

  if (!recipe) return <p className="text-center mt-20">Loading...</p>;

  const ingrValue = Array.isArray(recipe.ingr) ? recipe.ingr.join(",") : "";
  const instValue = Array.isArray(recipe.inst) ? recipe.inst.join(",") : "";

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

  const toggleFav = () => {
    const copyData = [...data];
    copyData[recipeIndex] = {
      ...copyData[recipeIndex],
      fav: !copyData[recipeIndex].fav,
    };
    setData(copyData);
    toast.success("Favourite updated!");
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* LEFT */}
      <div className="w-full lg:w-5/2 lg:sticky top-24">
        <div className="bg-gray-950 p-6 rounded-xl shadow-xl">
          <h1 className="text-5xl font-black mb-4">
            {recipe.title}
          </h1>

          {recipe.image && (
            <img
              className="w-full h-[260px] object-cover rounded-lg"
              src={recipe.image}
              alt={recipe.title}
            />
          )}

          <p className="mt-4 text-red-400 font-semibold">
            👨‍🍳 {recipe.chef}
          </p>

          <p className="mt-3 text-gray-300 leading-relaxed">
            {recipe.desc}
          </p>

          <button
            onClick={toggleFav}
            className="mt-4 text-xl"
          >
            {recipe.fav ? "❤️ Favourite" : "🤍 Not Favourite"}
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <form
        className="w-full lg:w-4/2 bg-gray-950 p-6 rounded-xl shadow-xl"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <input
          className="block w-full border-b p-2 mb-3"
          defaultValue={recipe.image}
          {...register("image")}
        />

        <input
          className="block w-full border-b p-2 mb-3"
          defaultValue={recipe.title}
          {...register("title")}
        />

        <input
          className="block w-full border-b p-2 mb-3"
          defaultValue={recipe.chef}
          {...register("chef")}
        />

        <textarea
          className="block w-full border-b p-2 mb-3"
          defaultValue={recipe.desc}
          {...register("desc")}
        />

        <textarea
          className="block w-full border-b p-2 mb-3"
          defaultValue={ingrValue}
          {...register("ingr")}
        />

        <textarea
          className="block w-full border-b p-2 mb-3"
          defaultValue={instValue}
          {...register("inst")}
        />

        <select
          className="block w-full border-b p-2 bg-gray-900 mb-4"
          defaultValue={recipe.category}
          {...register("category")}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="supper">Supper</option>
          <option value="dinner">Dinner</option>
        </select>

        <button className="bg-blue-950 px-4 py-2 rounded">
          Update Recipe
        </button>

        <button
          type="button"
          className="ml-3 bg-red-950 px-4 py-2 rounded"
          onClick={() => {
            const copyData = data.filter((r) => r.id != id);
            setData(copyData);
            toast.success("Recipe deleted!");
            navigate("/recipes");
          }}
        >
          Delete Recipe
        </button>
      </form>
    </div>
  );
};

export default SingleRecipe;
