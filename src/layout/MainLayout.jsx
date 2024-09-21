import React, { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../store/context'
import { getAllCategories, getAllProducts } from './../api/request'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Content from '../pages/Content'


const MainLayout = () => {
  const url = 'https://shop-database-ao4m.onrender.com'
  const cont = useRef()

  const { state, dispatch } = useContext(MainContext)
  useEffect(() => {
    getAllCategories(url, dispatch)
    getAllProducts(url, dispatch)
  }, [])



  useEffect(() => {
    if (state.colorMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [state.colorMode])


  return (
    <div>
      <div className='flex justify-between mx-3 min-h-screen sm:gap-3 gap-0 font-mont relative'>
        <div className={`${state.menuAct ? "w-[250px] translate-x-0 sm:relative duration-300 bg-white absolute z-20" : " duration-500 w-[0] sm:relative absolute sm:translate-x-0 translate-x-[-200px]"} sm:w-[250px] w-[0]  overflow-hidden my-[9px] h-[calc(100vh-18px)]`}>
          <Aside />
        </div>
        <div
          onClick={() => {
            if (state.menuAct) {
              dispatch({ type: "SET_MENU_ACT" })
            }
          }}
          onResize={() => {
            console.log("a")
            if (state.menuAct) {
              dispatch({ type: "SET_MENU_ACT" })
            }
          }}
          ref={cont} className={`${state.menuAct ? "" : ""} flex flex-1 gap-2 justify-center flex-col hello`}>
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

