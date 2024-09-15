import React, { useContext } from 'react'
import { BiEditAlt, BiTrash } from 'react-icons/bi'
import { MainContext } from '../../store/context'

const CatCard = ({ item, index }) => {
    const { dispatch } = useContext(MainContext)

    const showModal = (id, modalType) => {
        dispatch({ type: "TOGGLE_MODAL_ALERT" })
        dispatch({ type: "SELECT_ITEM_ID", payload: id })
        dispatch({ type: "SELECT_MODAL_TYPE", payload: modalType })
    }

    return (
        <div>
            <div className="flex justify-between items-center shadow-xl rounded-md bg-gray-200 px-2 py-2">
                <div className="w-[30px] h-[30px] flex justify-center items-center bg-blue-100 shadow-2xl rounded-lg">
                    <span className="text-[18px] font-semibold">{index + 1}</span>
                </div>
                <div className="text-[20px] font-bold">
                    {item.title}
                </div>

                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => {
                            showModal(item.id, 'update')
                        }}
                        className="flex justify-center items-center w-[35px] h-[35px] text-[24px] rounded-lg bg-green-500 text-white"
                        type='button'>
                        <BiEditAlt />
                    </button>

                    <button
                        onClick={() => {
                            showModal(item.id, 'delete')
                        }}
                        className="flex justify-center items-center w-[35px] h-[35px] text-[24px] rounded-lg bg-red-500 text-white"
                        type='submit'>
                        <BiTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CatCard
