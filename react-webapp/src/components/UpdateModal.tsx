import { Axios } from '../lib/axios'
import { FC, FormEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'

type UpdateModalProps = {
  isOpen: boolean
  closeModal: () => void
  id: number
  fetchData: () => void
}

const UpdateModal: FC<UpdateModalProps> = ({ isOpen, closeModal, id,fetchData }) => {
  const [name, setName] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [quantity, setQuantity] = useState<number | undefined>(undefined)
  const getProductById = () => {
    Axios.get(`products/${id}`).then((res) => {
      setName(res.data.name)
      setDescription(res.data.description)
      setPrice(res.data.price)
      setQuantity(res.data.quantity)
    })
  }
  useEffect(() => {
    getProductById()
  }, [id])

  const addData = () => {
    Axios.put(`products/${id}`, {
      id,
      name,
      description,
      price,
      quantity,
    })
      .then(function (response) {
        console.log(response)
        if (response.status === 204) {
          toast.success('Update successfully')
          fetchData()
          closeModal()
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error)
      })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    addData()
  }

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Update product">
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

export default UpdateModal
