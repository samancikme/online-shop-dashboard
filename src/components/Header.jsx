import { useLocation } from "react-router-dom";
import { btnData } from "../store/consts";
import { useContext } from "react";
import { MainContext } from "../store/context";
import { BiMenuAltLeft } from "react-icons/bi";

const Header = () => {
    const { state, dispatch } = useContext(MainContext)
    const { pathname } = useLocation()
    const selectItem = btnData.find(item => item.path === pathname)
    return (
        <div className='h-[65px] shadow-lg border-[1px] w-[100%] flex items-center'>
            <div className="flex justify-between items-center w-full px-5">
                <div className="">
                    <button className="text-[24px] sm:hidden"
                        onClick={() => dispatch({ type: "SET_MENU_ACT" })}>
                        {state.menuAct ? '' : <BiMenuAltLeft />}
                    </button>
                </div>
                <div className=" flex flex-1 justify-start flex-row-reverse sm:flex-row  items-center gap-1">
                    <div className="w-[40px] h-[40px] rounded-md bg-blue-400 flex justify-center items-center">
                        <div className="text-[24px] text-black" >{selectItem.icon()}</div>
                    </div>
                    <span className="text-[24px] text-black font-semibold border-b-2 border-blue-500">
                        {selectItem.title}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header
