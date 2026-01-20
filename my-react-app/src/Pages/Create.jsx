import { useContext } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { RecipeContext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(RecipeContext);
  const { register, handleSubmit, reset } = useForm();

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    setData([...data, recipe]);
    toast.success("New recipe created!");
    reset();
    navigate("/recipes");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <input
          className="block border-b p-2"
          {...register("image")}
          type="url"
          placeholder="Enter Image Url"
        />

        <input
          className="block border-b p-2"
          {...register("title")}
          type="text"
          placeholder="Recipe Title"
        />

        <input
          className="block border-b p-2"
          {...register("chef")}
          type="text"
          placeholder="Chef Name"
        />

        <textarea
          className="block border-b p-2"
          {...register("desc")}
          placeholder="Recipe Description"
        />

        <textarea
          className="block border-b p-2"
          {...register("ingr")}
          placeholder="Ingredients (comma separated)"
        />

        <textarea
          className="block border-b p-2"
          {...register("inst")}
          placeholder="Instructions (comma separated)"
        />

        <select
          className="block border-b p-2 bg-gray-700"
          {...register("category")}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="supper">Supper</option>
          <option value="dinner">Dinner</option>
        </select>

        <button className="mt-5 bg-gray-900 px-4 py-2 rounded">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default Create;
