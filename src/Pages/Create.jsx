import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";

const Create = () => {
  const { data, setData } = useContext(RecipeContext);
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  // 👇 live watch
  const image = watch("image");
  const title = watch("title");
  const chef = watch("chef");
  const desc = watch("desc");

  const SubmitHandler = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      chef: recipe.chef?.trim() ? recipe.chef : "Unknown Chef",
      ingr: recipe.ingr ? recipe.ingr.split(",") : [],
      inst: recipe.inst ? recipe.inst.split(",") : [],
      fav: false,
    };

    // ✅ append, DO NOT replace
    setData([...data, newRecipe]);

    toast.success("Recipe created!");
    navigate("/recipes");
    // ✅ Task 3: scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LIVE PREVIEW */}
      <div className="w-full lg:w-1/2 bg-gray-950 p-6 rounded-xl shadow-xl">
        <h2 className="text-4xl font-black mb-4">
          {title || "Recipe Title"}
        </h2>

        {image && (
          <img
            src={image}
            alt="preview"
            className="w-full h-[260px] object-cover rounded-lg"
          />
        )}

        <p className="mt-4 text-red-400 font-semibold">
          👨‍🍳 {chef || "Chef Name"}
        </p>

        <p className="mt-3 text-gray-300">
          {desc || "Recipe description will appear here..."}
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="w-full lg:w-1/2 bg-gray-950 p-6 rounded-xl shadow-xl"
      >
        <input
          {...register("image")}
          placeholder="Image URL"
          className="block w-full border-b p-2 mb-3"
        />

        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="block w-full border-b p-2 mb-3"
        />

        <input
          {...register("chef")}
          placeholder="Chef"
          className="block w-full border-b p-2 mb-3"
        />

        <textarea
          {...register("desc")}
          placeholder="Description"
          className="block w-full border-b p-2 mb-3"
        />

        <textarea
          {...register("ingr")}
          placeholder="Ingredients (comma separated)"
          className="block w-full border-b p-2 mb-3"
        />

        <textarea
          {...register("inst")}
          placeholder="Instructions (comma separated)"
          className="block w-full border-b p-2 mb-3"
        />

        <select
          {...register("category")}
          className="block w-full border-b p-2 bg-gray-900 mb-4"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="supper">Supper</option>
          <option value="dinner">Dinner</option>
        </select>

        <button className="bg-blue-950 px-4 py-2 rounded">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default Create;
