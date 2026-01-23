import { createContext, useEffect, useState } from "react";
import dummyRecipes from "../data/dummyRecipes";

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("recipes");

    if (stored) {
      const parsed = JSON.parse(stored);

      // 🔥 THIS IS THE FIX
      if (Array.isArray(parsed) && parsed.length > 0) {
        setData(parsed);
      } else {
        setData(dummyRecipes);
        localStorage.setItem(
          "recipes",
          JSON.stringify(dummyRecipes)
        );
      }
    } else {
      setData(dummyRecipes);
      localStorage.setItem(
        "recipes",
        JSON.stringify(dummyRecipes)
      );
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(data));
    }
  }, [data]);

  return (
    <RecipeContext.Provider value={{ data, setData }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
