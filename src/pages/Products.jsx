import React, { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../store/context'
import Loader from '../components/Loader'
import ProCard from '../components/PageComponents/ProCard'
import ModalAlert from '../components/PageComponents/ModalAlert'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteProduct, getAllProducts, updateProduct } from '../api/request'


const Products = () => {
  const { state, dispatch } = useContext(MainContext)
  const products = state.products,
    url = 'https://shop-database-ao4m.onrender.com'
  const form = useRef()
  const imageVal = useRef()


  const handleDelete = async (id) => {
    await deleteProduct(id, url, dispatch)
    dispatch({ type: "TOGGLE_MODAL_ALERT" })
    await getAllProducts(url, dispatch)
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault()
    
    const data = {
      title: form.current.elements['title'].value,
      description: form.current.elements['description'].value,
      image: form.current.elements['image'].value,
      price: form.current.elements['price'].value,
      categoryId: form.current.elements['category-name'].value
    };
    
    await updateProduct(url, id, data); 
    await getAllProducts(url, dispatch)
    dispatch({ type: "TOGGLE_MODAL_ALERT" })
};


  useEffect(() => {
    if (state.modalType === "update") {
      const selectedItem = state.products.find(item => item.id === state.selectItemId);
      
      if (selectedItem && form.current) {
        form.current.elements['title'].value = selectedItem.title;
        form.current.elements['description'].value = selectedItem.description;
        form.current.elements['image'].value = selectedItem.image;
        form.current.elements['price'].value = selectedItem.price;
        form.current.elements['category-name'].value = selectedItem.categoryId;
      }
    }
  }, [state.modalType, state.selectItemId]);
  

  return (
    <div className='w-[100%] h-[calc(100vh-92px)] px-4 py-2 overflow-y-scroll '>
      {state.isProLoading ?
        <div className='flex justify-center items-center w-[100%] h-[calc(100vh-92px)]'>
          <Loader />
        </div>
        :
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
          {products.map((item, index) => (
            <ProCard key={item.id} index={index} item={item} categories={state.categories} />
          ))}
        </div>}
      <ModalAlert>
        {state.modalType === "update" ?
          <div>
            <div className='px-3 py-2'>
              <div className="flex flex-col gap-3">
                <h1 className='text-[20px] font-bold'>Update Product</h1>
                <div className="w-full">
                  <form
                  onSubmit={(e) => handleUpdate(e , state.selectItemId)}
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
                      <input
                        required
                        ref={imageVal}
                        className='w-full px-4 py-2  border-2  border-blue-300 outline-blue-500 rounded-lg '
                        type="text"
                        id='image'
                        placeholder='Enter the pruduct image URL' />
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
              </div>
            </div>

          </div>
          :
          <div className='px-3 py-2'>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <h1 className='text-[20px] font-bold'>Delete Confirmation</h1>
                <p className="text-[16px] font-medium">
                  Are you sure you want to delete this product?
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

export default Products
