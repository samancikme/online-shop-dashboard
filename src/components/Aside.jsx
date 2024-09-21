import { BiSun } from "react-icons/bi"; 
import { BiMoon } from "react-icons/bi"; 
import { BiMenuAltRight } from "react-icons/bi";
import { SiDash } from "react-icons/si"
import { Link } from "react-router-dom"
import { btnData } from "../store/consts";
import Button from "./PageComponents/Button";
import { useContext } from "react";
import { MainContext } from "../store/context";



const Aside = () => {

  const { state, dispatch } = useContext(MainContext)


  return (
    <div className='shadow-lg border-[1px] h-full relative '>
      <div className="p-3 flex flex-col justify-between h-full ">
        <div className="">
          <div className="sm:flex hidden overflow-hidden ">
            <Link
              path='/'>
              <div className="flex justify-center items-center gap-2 pb-2 border-b-2">
                <SiDash className="text-[24px] text-blue-700" />
                <span className="text-[28px] font-bold text-blue-700">Dashboard</span>
              </div>
            </Link>
          </div>
          <div className="sm:hidden flex justify-end pr-[20px] h-[50px]  items-center">
            <button className="text-[24px]"
              onClick={() => dispatch({ type: "SET_MENU_ACT" })}
            ><BiMenuAltRight />
            </button>
          </div>
          <div
            className={`${state.menuAct ? "" : "sm:opacity-100 opacity-0 -z-10 sm:static absolute left-2 right-2 overflow-hidden sm:w-[100%]"} flex flex-col gap-1 mt-3 `}>
            {btnData.map(item => {
              const Icon = item.icon
              return (
                <Link key={item.id} to={item.path}>
                  <Button item={item} Icon={Icon} />
                </Link>
              )
            })}
          </div>
        </div>
        <div className="sm:hidden flex justify-end">
          <button 
          className={`${!state.colorMode? "text-blue-600" : "text-yellow-300 bg-gray-700"} w-[40px] h-[40px] rounded-lg text-[24px] bg-gray-300 flex justify-center items-center`}
          onClick={() =>  {
            alert("This is bulilding...")
            dispatch({ type: 'SET_COLOR_MODE' })
          }}>
            {state.colorMode ? <BiSun /> : <BiMoon />}
            </button>
        </div>
      </div>
    </div>
  )
}

export default Aside