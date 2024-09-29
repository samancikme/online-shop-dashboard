import React, { useContext, useRef } from 'react'
import { MainContext } from '../store/context'
import { createCategory, getAllCategories } from '../api/request';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {

  const errorMessage = useRef()
  const form = useRef()
  const url = "https://shop-database-ao4m.onrender.com"
  const { state, dispatch } = useContext(MainContext)


  const handleCreate = async (e) => {
    e.preventDefault()
    const val = e.target['inpCreate'].value.trim()
    if (val.length >= 3) {
      await createCategory(url, dispatch, val)
      await getAllCategories(url, dispatch)
      errorMessage.current.classList.add('hidden')
      form.current.reset()
    } else {
      errorMessage.current.classList.remove('hidden')
      setInterval(() => {
        errorMessage.current.classList.add('hidden')
      }, 2000);
    }
  }

  return (
    <div>
      <div className="flex flex-col p-4 gap-2">
        <label htmlFor="form" className='text-[24px] font-bold'>Category name</label>
        <form
          ref={form}
          onSubmit={(e) => handleCreate(e)}
          className='w-full flex flex-col gap-3'>
          <input
            id="inpCreate"
            className='w-full px-3 py-2 border-2 border-blue-600 outline-none rounded-lg'
            placeholder='Enter the category name'
            type="text" />
          <span ref={errorMessage} className="hidden text-[14px] text-red-500 font-semibold">
            Min 3 characters
          </span>
          <div className='flex justify-end'>
            <button
              className='text-[16px] font-bold px-4  py-2 hover:bg-green-700 active:scale-95 duration-200 bg-green-400 rounded-lg text-white' type="submit">
              {state.isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreateCategory
