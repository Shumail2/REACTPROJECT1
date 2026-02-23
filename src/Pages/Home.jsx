import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-20">
      <section className="text-center py-20">
        <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Discover Amazing Recipes 🍕
        </h1>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Cook smarter, eat better. Explore hand-picked recipes from top chefs.
        </p>

        <button
          onClick={() => navigate("/recipes")}
          className="mt-8 bg-red-600 hover:bg-red-700 transition px-10 py-4 rounded-full text-white hover:scale-105"
        >
          Start Cooking
        </button>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Join 10,000+ food lovers today!
        </p>
      </section>
    </div>
  );
};

export default Home;
