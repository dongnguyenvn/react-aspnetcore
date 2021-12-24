import { useCallback, useState } from 'react'

const useOpenModal = () => {
  let [isOpen, setIsOpen] = useState(false)

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const openModal = () => {
    setIsOpen(true)
  }

  return {isOpen,closeModal,openModal}
}

export default useOpenModal
