import { AiOutlineEye } from "react-icons/ai";
import React, { useContext, useRef, useState } from 'react'
import { MainContext } from '../store/context'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct, getAllProducts } from "../api/request";

const CreateProduct = () => {
  const [image, setImage] = useState("https://cdn-icons-png.freepik.com/512/2530/2530593.png")
  const url = 'https://online-shop-o62f.onrender.com/products'
  const form = useRef()
  const imageVal = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = {
      title: form.current["title"].value,
      description: form.current["description"].value,
      image: form.current["image"].value,
      price: form.current["price"].value,
      categoryName: form.current["category-name"].value
    }
    console.log(product)
    await createProduct(url ,product, dispatch)
    form.current.reset()
    await getAllProducts(url, dispatch)
  }

  const { state, dispatch } = useContext(MainContext)
  return (
    <div className='flex justify-center flex-col items-center py-6 px-4 pt-[100px] h-[calc(100vh-92px)] overflow-y-scroll '>
      <div className=" flex justify-center items-center w-[300px] h-[200px] border-dashed border-[1px] border-black">
        <img className='w-auto h-[200px] object-fill' src={image} alt="" />
      </div>
      <div className="w-full">
        <form
        onSubmit={(e) => handleSubmit(e) }
          ref={form}
          className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label className='text-[24px] font-bold' htmlFor="title">Title:</label>
            <input
              required
              className='w-full px-4 py-2 border-2  border-blue-300 outline-blue-500 rounded-lg '
              type="text"
              id='title'
              placeholder='Enter the pruduct name' />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[24px] font-bold' htmlFor="image">Image:</label>
            <div className=" relative">
              <input
                required
                ref={imageVal}
                className='w-full px-4 py-2  border-2  border-blue-300 outline-blue-500 rounded-lg '
                type="text"
                id='image'
                placeholder='Enter the pruduct image URL' />
              <div className=" absolute top-[1px] bg-gray-500 right-[1px] bottom-[1px] w-[50px] rounded-lg flex justify-center items-center text-[24px] text-white">
                <button
                  onClick={() => {
                    if (imageVal.current.value.includes('https://')) {
                      setImage(imageVal.current.value)
                    } else {
                      toast.error('Please enter a valid image URL')
                    }
                  }}
                  type="button">
                  <AiOutlineEye />
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[24px] font-bold' htmlFor="description">Description:</label>
            <textarea
              required
              className='resize-none w-full px-4 py-2 border-2 border-blue-300 outline-blue-500 rounded-lg'
              id="description"
              type="text"
              placeholder='Enter the product description'
              rows='2' />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[24px] font-bold' htmlFor="price">Price:</label>
            <input
              required
              className='w-full px-4 py-2 border-2 border-blue-300 outline-blue-500 rounded-lg '
              type="number"
              id='price'
              placeholder='Enter the product price' />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-semibold" htmlFor="category-name">Category</label>
            <select
              required
              className="w-full px-4 py-2 border-2 border-blue-300 outline-blue-500 rounded-lg "
              type="text"
              id="category-name"
              placeholder="Enter the category name">
              {state.categories.map(item => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
          <div className='flex justify-end gap-2'>
            <button className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-[16px] font-semibold active:scale-95 duration-500 text-white rounded-lg'>
              {state.isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreateProduct
