import { BiCategory } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import React from 'react'
import { useLocation } from "react-router-dom";
import { btnData } from "../store/consts";

const Header = () => {
    const {pathname} = useLocation()
    const selectItem = btnData.find(item => item.path === pathname)
    return (
        <div className='h-[65px] shadow-lg border-[1px] w-[100%] flex items-center'>
            <div className="flex justify-between items-center w-full px-5">
                <div className="flex flex-1 justify-start items-center gap-1">
                    <div className="w-[40px] h-[40px] rounded-md bg-blue-400 flex justify-center items-center">
                        <div className="text-[24px] text-black" >{selectItem.icon()}</div>
                    </div>
                    <span className="text-[24px] text-black font-semibold border-b-2 border-blue-500">
                    {selectItem.title}
                    </span>
                </div>
                <form className="flex-1 flex justify-center items-center relative">
                    <input 
                    className="w-full px-5 py-2 border-[1px] rounded-full"
                    type="text" 
                    placeholder='Search...' />
                    <button
                    className="absolute top-0 right-1 w-[30px] text-[26px] bottom-0 "
                     type="submit">
                        <BiSearchAlt />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Header
