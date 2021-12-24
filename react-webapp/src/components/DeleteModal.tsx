import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Axios } from '../lib/axios'
import toast from 'react-hot-toast'

type ModalProps = {
  isOpen: boolean
  closeModal: () => void
  id: number
  fetchData : () => void
}

const DeleteModal: FC<ModalProps> = ({ isOpen, closeModal, id,fetchData }) => {
  const deleteProduct = () => {
    Axios.delete(`products/${id}`,)
        .then(function (response) {
          if(response.status === 204) {
            toast.success('Delete successfully')
            fetchData()
          }
        })
        .catch(function (error) {
          console.log(error)
          toast.error(error)
        })
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/20" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure ?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This action cannot be undone. Are you sure you want to
                    delete this product?
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-1 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    onClick={closeModal}
                  >
                    cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-1 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={deleteProduct}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeleteModal
