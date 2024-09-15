import React, { useContext, useEffect } from 'react'
import { MainContext } from '../store/context'
import { getAllCategories, getAllProducts } from './../api/request';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Aside from '../components/Aside';
import Content from '../pages/Content';


const MainLayout = () => {
  const { state, dispatch } = useContext(MainContext)
  useEffect(() => {
    getAllCategories('https://shop-database-ao4m.onrender.com/categories', dispatch)
    getAllProducts('https://shop-database-ao4m.onrender.com/products', dispatch)
  }, [])

  console.log(state)

  return (
    <div>
      <div className='flex justify-between mx-3 min-h-screen gap-3 font-mont'>
        <div className="w-[250px] my-[9px] h-[calc(100vh-18px)]">
          <Aside />
        </div>
        <div className='flex flex-1 gap-2 justify-center flex-col '>
          <Header />
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
    </div>
  )
}

export default MainLayout

