import { FC } from 'react'
import useOpenModal from '../hook/useOpenModal'
import DeleteModal from './DeleteModal'
import UpdateModal from './UpdateModal'

type CardProductProps = {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  fetchData : () => void
}

const CardProduct: FC<CardProductProps> = ({
  id,
  name,
  description,
  price,
  quantity,
  fetchData
}) => {
  const { isOpen : isOpenDelete, closeModal:closeModalDelete, openModal:openModalDelete } = useOpenModal()
  const { isOpen : isOpenUpdate, closeModal:closeModalUpdate, openModal:openModalUpdate } = useOpenModal()

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 hover:ring-2 hover:ring-gray-300 transition-shadow duration-200 ease-out flex flex-col">
      <div className="cursor-pointer flex-grow flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{name}</h2>
          <p className="text-sm text-black font-semibold">{price} $</p>
        </div>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
      </div>
      <div className='flex items-center justify-between mt-2'>
        <p className="text-xs">Quantity : {quantity}</p>
        <div className="space-x-2 flex items-center">
          <button className="px-2 py-0.5 rounded-xl bg-green-100 shadow-sm hover:bg-green-200 group" onClick={openModalUpdate}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover:text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            className="px-2 py-0.5 bg-red-100 rounded-xl shadow-sm hover:bg-red-200 group"
            onClick={openModalDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover:text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <DeleteModal isOpen={isOpenDelete} closeModal={closeModalDelete} id={id} fetchData={fetchData} />
      <UpdateModal isOpen={isOpenUpdate} closeModal={closeModalUpdate} id={id} fetchData={fetchData}/>
    </div>
  )
}

export default CardProduct
