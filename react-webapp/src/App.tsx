import { useState, useEffect } from 'react'
import CardProduct from './components/CardProduct'
import { Axios } from './lib/axios'
import Loading from './components/Loading'
import AddButton from './components/AddButton'
import { Toaster } from 'react-hot-toast'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  quantity: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    Axios.get('products').then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container max-w-4xl mx-auto py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Products</h1>
            <AddButton fetchData={fetchData} />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid md:grid-cols-2 mt-6 gap-4">
              {products.map((p) => (
                <CardProduct key={p.id} {...p} fetchData={fetchData}/>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App
