import React, { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../store/context'
import CatCard from "../components/PageComponents/CatCard";
import Loader from '../components/Loader';
import ModalAlert from '../components/PageComponents/ModalAlert';
import { deleteCategory, getAllCategories, getAllProducts, updateCategory } from '../api/request';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categories = () => {

  
  const url = "https://shop-database-ao4m.onrender.com"


  const { state, dispatch } = useContext(MainContext)
  const categories = state.categories

  const categoryInput = useRef()
  const errorMessage = useRef()


  const handleDelete = async (id) => {
    await deleteCategory(id, url, dispatch)
    dispatch({ type: "TOGGLE_MODAL_ALERT" })
    await getAllCategories(url, dispatch)
    await getAllProducts(url, dispatch)
  }
  const handleUpdate = async (id, inpVal) => {
    await updateCategory(id, url, dispatch, inpVal)
    dispatch({ type: "TOGGLE_MODAL_ALERT" })
    await getAllCategories(url, dispatch)
    await getAllProducts(url, dispatch)
  }


  const update = (e) => {
    e.preventDefault()
    const inputValue = e.target["input-category"].value.trim()
    if (inputValue.length > 2) {
      handleUpdate(state.selectItemId, inputValue)
      errorMessage.current.classList.add("hidden")
    } else {
      errorMessage.current.classList.remove("hidden")
      categoryInput.current.focus()
      setTimeout(() => {
        errorMessage.current.classList.add("hidden")
      }, 2000)
    }
  }


  useEffect(() => {
    if (categoryInput.current) {
      const defValue = state.categories.find(item => item.id === state.selectItemId)?.title
      categoryInput.current.value = defValue
    }
  }, [state.modalType, state.selectItemId])

  return (
    <div className='w-[100%] h-[calc(100vh-92px)] px-4 py-2'>
      {state.isCatLoading ?
        <div className='flex justify-center items-center w-[100%] h-[calc(100vh-92px)]'>
          <Loader />
        </div>
        :
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3'>
          {categories.map((item, index) => (
            <CatCard key={item.id} index={index} item={item} />
          ))}
        </div>}
      <ModalAlert>
        {state.modalType === "update" ?
          <div>
            <div className='px-3 py-2'>
              <div className="flex flex-col gap-3">
                <h1 className='text-[20px] font-bold'>Update Category</h1>
                <form
                  onSubmit={(e) => update(e)}
                  className='flex flex-col'>
                  <label>Category name</label>
                  <input
                    ref={categoryInput}
                    id='input-category'
                    type='text'
                    className='text-[16px] px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none' />
                  <span ref={errorMessage} className="hidden text-[14px] text-red-500 font-semibold">
                    Min 3 characters
                  </span>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type='button'
                      className='text-[16px] text-white font-semibold px-4 rounded-lg   py-2 bg-blue-500'
                      onClick={() => dispatch({ type: 'TOGGLE_MODAL_ALERT' })}>
                      Cancel
                    </button>

                    <button
                      type='submit'
                      className='text-[16px] text-white font-semibold px-4 rounded-lg   py-2 bg-green-500'>
                      {state.isLoading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
          :
          <div className='px-3 py-2'>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <h1 className='text-[20px] font-bold'>Delete Confirmation</h1>
                <p className="text-[16px] font-medium">
                  Are you sure you want to delete this category?
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className='text-[16px] text-white font-semibold px-4 rounded-lg   py-2 bg-blue-500'
                  onClick={() => dispatch({ type: 'TOGGLE_MODAL_ALERT' })}>
                  Cancel
                </button>
                <button
                  className='text-[16px] text-white font-semibold px-4 rounded-lg   py-2 bg-red-500'
                  onClick={() => { handleDelete(state.selectItemId) }}>
                  {state.isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        }
      </ModalAlert>
      <ToastContainer />
    </div>
  )
}

export default Categories
