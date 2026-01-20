import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from '../Pages/Home.jsx'
import Recipes from '../Pages/Recipes.jsx'
import About from '../Pages/About.jsx'
import Create from '../Pages/Create.jsx'
import SingleRecipe from '../Pages/SingleRecipe.jsx'
export const Mainroutes = () => {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/recipes" element={<Recipes />} />
  <Route path="/recipes/detail/:id" element={<SingleRecipe />} />
  <Route path="/about" element={<About />} />
  <Route path="/create" element={<Create />} />
</Routes>
  )
}
export default Mainroutes
