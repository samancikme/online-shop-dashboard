import React, { useContext } from 'react'
import { MainContext } from '../../store/context'
import { useInView } from 'react-intersection-observer'

const ModalAlert = ({ children }) => {
    const { state, dispatch } = useContext(MainContext)
    const { ref, inView } = useInView({
        threshold: 0
    })
    return (
        <div
            onClick={(e) => {
                if (e.target.classList.contains("modal")) {
                    dispatch({ type: "TOGGLE_MODAL_ALERT" })
                }
            }}
            className={`${state.showModal ? "flex" : "hidden"} ${state.modalType === 'update'? "pt-[10vh]" : "pt-[30vh]"} rounded-lg modal fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-10 z-40 px-[3%] backdrop-blur justify-center items-start  pb-[20px] overflow-y-auto`}>
            <div
                ref={ref}
                className={`${inView ? "opacity-100 top-0" : "opacity-0 top-[150px]"} duration-500 relative w-[600px] p-3 bg-white  rounded-lg text-gray-700`}>
                {children}
            </div>
        </div>
    )
}

export default ModalAlert