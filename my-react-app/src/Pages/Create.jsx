import { useContext } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(RecipeContext);

  const { register, handleSubmit, reset, watch } = useForm();

  // 🔴 live preview values
  const image = watch("image");
  const title = watch("title");
  const chef = watch("chef");
  const desc = watch("desc");

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    recipe.fav = false;

    const copyData = Array.isArray(data) ? [...data] : [];
    copyData.push(recipe);

    setData(copyData);
    localStorage.setItem("recipes", JSON.stringify(copyData));

    toast.success("New recipe created!");
    reset();
    navigate("/recipes");
  };

  return (
    <div className="flex gap-10">
      {/* LEFT – FORM */}
      <form
        className="w-1/2 bg-gray-900 p-6 rounded-xl shadow-xl"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <input
          className="block w-full max-w-md mx-auto border-b p-2 mb-3"
          {...register("image")}
          type="url"
          placeholder="Enter Image Url"
        />

        <input
          className="block w-full max-w-md mx-auto border-b p-2 mb-3"
          {...register("title")}
          type="text"
          placeholder="Recipe Title"
        />

        <input
          className="block w-full max-w-md mx-auto border-b p-2 mb-3"
          {...register("chef")}
          type="text"
          placeholder="Chef Name"
        />

        <textarea
          className="block w-full max-w-md mx-auto border-b p-2 mb-3"
          {...register("desc")}
          placeholder="Recipe Description"
        />

        <textarea
          className="block w-full max-w-md mx-auto border-b p-2 mb-3"
          {...register("ingr")}
          placeholder="Ingredients (comma separated)"
        />

        <textarea
          className="block w-full max-w-md mx-auto border-b p-2 mb-3"
          {...register("inst")}
          placeholder="Instructions (comma separated)"
        />

        <select
          className="block w-full max-w-md mx-auto border-b p-2 bg-gray-700"
          {...register("category")}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="supper">Supper</option>
          <option value="dinner">Dinner</option>
        </select>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-900 px-6 py-2 rounded">
            Save Recipe
          </button>
        </div>
      </form>

      {/* RIGHT – LIVE PREVIEW */}
      <div className="w-1/2 sticky top-24">
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl text-gray-400 mb-3">Live Preview</h2>

          {image ? (
            <img
              src={image}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          ) : (
            <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
              Image Preview
            </div>
          )}

          <h1 className="text-3xl font-bold">
            {title || "Recipe Title"}
          </h1>

          <p className="text-red-400 mt-1">
            {chef || "Chef Name"}
          </p>

          <p className="mt-3 text-gray-300">
            {desc || "Recipe description will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Create;
