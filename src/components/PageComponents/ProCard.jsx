import { useContext } from "react"
import { BiEditAlt, BiTrash } from "react-icons/bi"
import { useInView } from "react-intersection-observer"
import { MainContext } from "../../store/context"

const ProCard = ({ item, categories }) => {


  const { dispatch } = useContext(MainContext)

  const showModal = (id, modalType) => {
    dispatch({ type: "TOGGLE_MODAL_ALERT" })
    dispatch({ type: "SELECT_ITEM_ID", payload: id })
    dispatch({ type: "SELECT_MODAL_TYPE", payload: modalType })
  }




  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  return (
    <div
      ref={ref}
      className={`${inView ? "opasity-100 top-0" : "opacity-0 top-[30px]"} duration-500 relative p-3 bg-white shadow-md rounded-lg border-[1px] flex flex-col`}>
      <div className='border-[1px] overflow-hidden rounded-lg relative flex-1'>
        <img className='h-[300px] w-full object-cover' src={item.image} alt={item.title} />
        <span className='absolute top-[10px] left-[10px] p-[5px] bg-black bg-opacity-50 rounded-lg text-white text-[12px] font-semibold'>
          {categories.find(catItem => catItem.id === item.categoryId)?.title}
        </span>

      </div>
      <div className='mt-2 flex flex-col justify-between flex-1'>
        <div className='flex-1'>
          <h1 className='text-[20px] font-semibold'>{item.title}</h1>
          <div className='h-[120px] p-2 border-[1px] rounded-lg overflow-y-auto text-[14px] mt-1'>
            {item.description}
          </div>
        </div>
        <div className='flex justify-between items-end gap-1 flex-1'>
          <div className='p-1 rounded-lg flex-[2] text-[20px] font-semibold'>
            price : {item.price} $
          </div>
          <div className="flex justify-between items-center flex-1 gap-2">
            <button
              onClick={() => {
                showModal(item.id, 'update')
              }}
              className='flex justify-center items-center gap-2 rounded-2xl w-[60px] h-[40px] bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold text-[24px]'>
              <BiEditAlt />
            </button>
            <button
              onClick={() => {
                showModal(item.id, 'delete')
              }}
              className='flex justify-center items-center gap-2 rounded-2xl w-[60px] h-[40px] bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-[24px]'>
              <BiTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProCard
