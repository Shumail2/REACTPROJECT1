import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const dummyRecipes = [
  {
    id: "d1",
    title: "Classic Margherita Pizza",
    chef: "Chef Mario",
    desc: "Traditional Italian pizza with fresh mozzarella and basil.",
    image: "https://cdn.dummyjson.com/recipe-images/1.webp",
    fav: false,
  },
  {
    id: "d2",
    title: "Creamy Alfredo Pasta",
    chef: "Chef Anna",
    desc: "Rich creamy pasta cooked with parmesan cheese.",
    image: "https://cdn.dummyjson.com/recipe-images/2.webp",
    fav: false,
  },
  {
    id: "d3",
    title: "Chicken Biryani",
    chef: "Chef Ayaan",
    desc: "Spicy basmati rice cooked with marinated chicken.",
    image: "https://cdn.dummyjson.com/recipe-images/3.webp",
    fav: false,
  },
  {
    id: "d4",
    title: "Avocado Toast",
    chef: "Chef Olivia",
    desc: "Healthy avocado toast with olive oil and herbs.",
    image: "https://cdn.dummyjson.com/recipe-images/4.webp",
    fav: false,
  },
  {
    id: "d5",
    title: "Chocolate Pancakes",
    chef: "Chef Liam",
    desc: "Soft pancakes topped with chocolate syrup.",
    image: "https://cdn.dummyjson.com/recipe-images/5.webp",
    fav: false,
  },
  {
    id: "d6",
    title: "Grilled Salmon",
    chef: "Chef Noah",
    desc: "Perfectly grilled salmon with lemon butter sauce.",
    image: "https://cdn.dummyjson.com/recipe-images/6.webp",
    fav: false,
  },
  {
    id: "d7",
    title: "Veggie Burger",
    chef: "Chef Emma",
    desc: "Healthy vegetable burger with fresh lettuce.",
    image: "https://cdn.dummyjson.com/recipe-images/7.webp",
    fav: false,
  },
  {
    id: "d8",
    title: "Fruit Smoothie Bowl",
    chef: "Chef Ava",
    desc: "Refreshing smoothie bowl with mixed fruits.",
    image: "https://cdn.dummyjson.com/recipe-images/8.webp",
    fav: false,
  },
];

const Recipes = () => {
  const { data } = useContext(RecipeContext);

  if (!Array.isArray(data)) {
    return <p>Loading recipes...</p>;
  }

  // 👇 use real data if exists, otherwise dummy
  const recipesToShow = data.length > 0 ? data : dummyRecipes;

  return (
    <div className="grid grid-cols-4 gap-6">
      {recipesToShow.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipes;
