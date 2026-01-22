import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext(null);

const RecipeProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // ✅ load from localStorage ONCE
  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setData(JSON.parse(storedRecipes));
    }
  }, []); // 👈 important: empty dependency array

  return (
    <RecipeContext.Provider value={{ data, setData }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
