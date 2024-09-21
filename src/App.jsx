import React, { useReducer } from 'react'
import { initialState, reducer } from './store/store'
import { MainContext } from './store/context'
import MainLayout from './layout/MainLayout'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useParams } from 'react-router-dom'
import Categories from './pages/Categories'
import Products from './pages/Products'
import CreateCategory from './pages/CreateCategory';
import CreateProduct from './pages/CreateProduct'
import Home from './pages/Home'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)


  
  const router = createBrowserRouter(
    createRoutesFromElements  (
      <Route path='/' element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/create-category" element={<CreateCategory/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/create-product" element={<CreateProduct/>} />
      </Route>
    )
  )
  return ( 
    <MainContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router}/>
    </MainContext.Provider>
  )
}

export default App
