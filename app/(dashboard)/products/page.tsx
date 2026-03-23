export default function ProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800">
          Add Product
        </button>
      </div>
      <div className="bg-white rounded-lg border p-6 text-center text-gray-400 text-sm">
        No products yet. Add your first product to get started.
      </div>
    </div>
  )
}
