import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RecipeProvider from "./context/RecipeContext.jsx";

createRoot(document.getElementById("root")).render(
  <RecipeProvider>
    <HashRouter>
      <App />
      <ToastContainer />
    </HashRouter>
  </RecipeProvider>
);
