import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MainContext } from '../../store/context'

const Button = ({ item, Icon }) => {
    const { pathname } = useLocation()
    const activeBtn = item.path === pathname ? true : false
    const { dispatch } = useContext(MainContext)
    return (

        <div>
            <button
                onClick={() => {
                    dispatch({ type: "SET_PATH", payload: item.path })
                }}
                className={` ${activeBtn ? "bg-blue-300 hover:bg-blue-300" : ""}  flex items-center justify-start hover:bg-blue-100 duration-150 gap-1 px-2 py-2 border-[1px] border-gray-100 rounded-md shadow-lg w-[100%]`}>
                <div>
                    <Icon className="text-[24px]" />
                </div>
                <span className='text-[18px] font-semibold'>{item.title}</span>
            </button>
        </div >
    )
}

export default Button
