import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, setData } = useContext(RecipeContext);
  const { register, handleSubmit } = useForm();

  const recipeIndex = data.findIndex(
    (recipe) => params.id == recipe.id
  );

  const recipe = data[recipeIndex];

  const SubmitHandler = (updatedRecipe) => {
    const copyData = [...data];

    copyData[recipeIndex] = {
      ...copyData[recipeIndex],
      ...updatedRecipe,
      ingr: updatedRecipe.ingr
        ? updatedRecipe.ingr.split(",")
        : [],
      inst: updatedRecipe.inst
        ? updatedRecipe.inst.split(",")
        : [],
    };

    setData(copyData);
    toast.success("Recipe updated!");
    navigate("/recipes");
  };

  if (!recipe) return "Loading...";

  return (
    <div className="w-full flex gap-6">
      {/* LEFT */}
      <div className="w-1/2 p-2">
        <h1 className="text-5xl font-black">{recipe.title}</h1>
        <img
          className="mt-2 h-[20vh]"
          src={recipe.image}
          alt={recipe.title}
        />
        <h1>{recipe.chef}</h1>
        <p>{recipe.desc}</p>
      </div>

      {/* RIGHT */}
      <form
        className="w-1/2 p-2"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <input
          className="block border-b p-2"
          defaultValue={recipe.image}
          {...register("image")}
        />

        <input
          className="block border-b p-2"
          defaultValue={recipe.title}
          {...register("title")}
        />

        <input
          className="block border-b p-2"
          defaultValue={recipe.chef}
          {...register("chef")}
        />

        <textarea
          className="block border-b p-2"
          defaultValue={recipe.desc}
          {...register("desc")}
        />

        <textarea
          className="block border-b p-2"
          defaultValue={
            Array.isArray(recipe.ingr)
              ? recipe.ingr.join(",")
              : recipe.ingr
          }
          {...register("ingr")}
        />

        <textarea
          className="block border-b p-2"
          defaultValue={
            Array.isArray(recipe.inst)
              ? recipe.inst.join(",")
              : recipe.inst
          }
          {...register("inst")}
        />

        <select
          className="block border-b p-2 bg-gray-700"
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
            const copyData = data.filter(
              (r) => params.id != r.id
            );
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
