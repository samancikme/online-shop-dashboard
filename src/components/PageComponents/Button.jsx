import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MainContext } from '../../store/context'

const Button = ({ item, Icon }) => {
    const { pathname } = useLocation()
    const activeBtn = item.path === pathname ? true : false
    const {state , dispatch } = useContext(MainContext)
    return (
        <div>
            <button
                onClick={() => {
                    dispatch({ type: "SET_PATH", payload: item.path })
                    if(state.menuAct){
                        dispatch({type: "SET_MENU_ACT" })
                    }
                }}
            className={` ${activeBtn ? "bg-blue-400 hover:bg-blue-400 text-white" : ""}  flex items-center justify-start hover:bg-blue-100 duration-150 gap-3 px-2 py-2 rounded-md w-[100%]`}>
            <div>
                <Icon className={`${activeBtn? "text-white" : "text-gray-500" } text-[24px] `} />
            </div>
            <span className='text-[18px] font-semibold'>{item.title}</span>
        </button>
        </div >
    )
}

export default Button
