/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import SpotlightCard from './kokonutui/SpotlightCard'
import SmartImage from './ui/SmartImage'
import { formatPrice } from '../data/cars'

const CarCard = ({ car }) => {
  const { id, image, brand, model, year, location, fuel, transmission, mileage, price, oldPrice, badge } = car

  return (
    <SpotlightCard className="cards h-full" accent="#3b82f6">
      <div className="relative mb-4 overflow-hidden rounded-xl bg-white/5">
        <SmartImage
          src={image}
          alt={`${brand} ${model}`}
          className="h-44 w-full rounded-xl"
          imgClassName="object-cover"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-semibold text-white">
            {brand} {model}
          </h3>
          <span className="text-xs text-white/40">{year}</span>
        </div>
        <p className="mt-0.5 text-sm text-white/50">{location}</p>

        <div className="mt-4 flex justify-between border-y border-white/10 py-3 text-xs text-white/60">
          <span>{mileage ? `${mileage.toLocaleString('fr-FR')} km` : 'Neuf'}</span>
          <span>{fuel}</span>
          <span>{transmission}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {oldPrice > price && (
              <p className="text-xs text-white/40 line-through">{formatPrice(oldPrice)}</p>
            )}
            <p className="text-lg font-semibold text-white">{formatPrice(price)}</p>
          </div>
          <Link to={`/listing/${id}`} className="text-sm font-medium text-accent hover:underline">
            Voir les détails
          </Link>
        </div>
      </div>
    </SpotlightCard>
  )
}

export default CarCard
