import lambo from '../assets/Lamborghini-PNG-Isolated-Photo.png'

const Card = () => {
  return (
    <div className="card min-w-[280px] cursor-pointer overflow-hidden rounded-xl bg-zinc-700 p-1 text-white shadow-lg shadow-black/40 sm:min-w-[320px]">
      <div className="rounded-xl bg-zinc-800 p-1">
        <img src={lambo} alt="" className="h-48 rounded-xl object-cover" />
      </div>

      <div className="p-4">
        <div className="details border-b border-gray-500 pb-3 leading-tight">
          <h1 className="text-xl font-semibold">Lamborghini</h1>
          <p className="text-sm text-gray-400">Gurugram, India</p>
        </div>

        <div className="specs flex justify-between p-4 border-b border-gray-500">
          <p>25/Kmpl</p>
          <p>Petrol</p>
          <p>Manual</p>
        </div>

        <div className="price flex items-center justify-between p-2">
          <div className="left">
            <p className="text-sm text-gray-500 line-through">$24000</p>
            <h1 className="text-lg font-medium text-white">$20000</h1>
          </div>
          <a href="#inventory" className="font-medium text-accent hover:underline">
            View details
          </a>
        </div>
      </div>
    </div>
  )
}

export default Card
