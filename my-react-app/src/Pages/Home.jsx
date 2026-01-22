import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ✅ Correct hook usage
  useEffect(() => {
    getProducts();
    return () => console.log("Home cleanup");
  }, []);

  return (
    <div className="space-y-20">
      {/* 🔥 HERO SECTION */}
      <section className="text-center py-20">
        <h1 className="text-6xl font-black bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
          Discover Amazing Recipes 🍔
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Cook smarter, eat better. Explore hand-picked recipes from top chefs.
        </p>

        <button
          onClick={() => navigate("/recipes")}
          className="mt-8 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full text-white"
        >
          Explore Now
        </button>
      </section>

      {/* 🔄 LOADING STATE */}
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          Loading featured recipes...
        </p>
      )}

      {/* 🧩 PRODUCT GRID */}
      {!loading && (
        <section className="grid grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/30 transition-all hover:-translate-y-1"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  ⭐ {item.rating} • ${item.price}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
