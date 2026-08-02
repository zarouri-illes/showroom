/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SpotlightCard from './kokonutui/SpotlightCard'
import SmartImage from './ui/SmartImage'

const CarCard = ({ car }) => {
  const { id, image, brand, model, year, location, fuel, transmission, mileage, badge } = car

  return (
    <SpotlightCard className="cards h-full" accent="#e11d2e">
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

        <div className="mt-5">
          <Link
            to={`/listing/${id}`}
            className="btn-anime btn-glow group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-accent-hover"
          >
            Voir les détails
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </SpotlightCard>
  )
}

export default CarCard
