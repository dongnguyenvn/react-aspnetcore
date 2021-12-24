import { Axios } from '../lib/axios'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'
import useOpenModal from '../hook/useOpenModal'

const AddButton = ({fetchData} : {fetchData : () => void}) => {
  const { isOpen, closeModal, openModal } = useOpenModal()
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [quantity, setQuantity] = useState<number | null>(null)


  const addData = () => {
    Axios.post('products', {
      name,
      description,
      price,
      quantity,
    })
      .then(function (response) {
        if (response.status === 201) {
          toast.success('Insert successfully')
          resetInput()
          fetchData()
          closeModal()
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error)
      })
  }

  const resetInput = () => {
    setName(null)
    setDescription(null)
    setPrice(null)
    setQuantity(null)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    addData()
  }

  return (
    <>
      <button
        className="bg-green-300 px-6 py-1 rounded-xl shadow-sm hover:bg-green-400"
        onClick={openModal}
      >
        <AddIcon />
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add product">
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-3 py-1.5 text-sm placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 "
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="block mb-2 text-sm text-gray-600">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              min={1000}
              required
              className="w-full px-3 py-1.5 text-sm placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 appearance-none"
              value={price || ''}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm text-gray-600"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min={1}
              required
              className="w-full px-3 py-1.5 text-sm placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 "
              value={quantity || ''}
              onChange={(e) => setQuantity(e.target.valueAsNumber)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="description"
              className="block mb-2 text-sm text-gray-600"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              className="w-full px-3 py-1 text-sm placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-100 focus:border-green-300 "
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              className="inline-flex justify-center px-5 py-1 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              onClick={closeModal}
            >
              cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-5 py-1 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-800"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
)

export default AddButton
