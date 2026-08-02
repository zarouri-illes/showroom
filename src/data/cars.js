import mg5pic1 from '../assets/cars/mg5/pic1.jpg'
import mg5pic2 from '../assets/cars/mg5/pic2.jpg'
import mg5pic3 from '../assets/cars/mg5/pic3.jpg'
import fiattipopic1 from '../assets/cars/fiattipo/pic1.jpg'
import fiattipopic2 from '../assets/cars/fiattipo/pic2.jpg'
import fiattipopic3 from '../assets/cars/fiattipo/pic3.jpg'
import fiattipopic4 from '../assets/cars/fiattipo/pic4.jpg'
import fiat500pic1 from '../assets/cars/fiat500/pic1.jpg'
import fiat500pic2 from '../assets/cars/fiat500/pic2.jpg'
import fiat500pic3 from '../assets/cars/fiat500/pic3.jpg'
import kamiqgtpic1 from '../assets/cars/kamiqgt/pic1.jpg'
import kamiqgtpic2 from '../assets/cars/kamiqgt/pic2.jpg'
import kamiqgtpic3 from '../assets/cars/kamiqgt/pic3.jpg'
import kamiqgtpic4 from '../assets/cars/kamiqgt/pic4.jpg'
import kamiqgtpic5 from '../assets/cars/kamiqgt/pic5.jpg'

export const CATEGORIES = [
  { value: 'new', label: 'Voitures neuves' },
  { value: 'used', label: "Voitures d'occasion" },
  { value: 'stock', label: 'En stock' },
]

export const CAR_BRANDS = [
  { value: 'mg', label: 'MG' },
  { value: 'fiat', label: 'Fiat' },
  { value: 'skoda', label: 'Skoda' },
]

export const SORT_OPTIONS = [
  { value: 'featured', label: 'En vedette' },
  { value: 'newest', label: 'Les plus récents' },
]

export const CARS = [
  {
    id: 'mg-mg5-2024',
    brand: 'MG',
    model: 'MG5',
    name: 'MG MG5 2024',
    year: 2024,
    category: 'new',
    price: 0,
    oldPrice: 0,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Bouira, Algérie',
    image: mg5pic1,
    gallery: [mg5pic1, mg5pic2, mg5pic3],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 165, acceleration: '8,4 s', topSpeed: '200 km/h', seats: 5, engine: '1.5 Turbo', color: 'Rouge' },
    description:
      "La MG5, la berline moderne et élégante : design affirmé, équipements généreux et agrément de conduite au quotidien. Une voiture pensée pour durer.",
  },
  {
    id: 'fiat-tipo-2024',
    brand: 'Fiat',
    model: 'Tipo',
    name: 'Fiat Tipo 2024',
    year: 2024,
    category: 'new',
    price: 0,
    oldPrice: 0,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Bouira, Algérie',
    image: fiattipopic1,
    gallery: [fiattipopic1, fiattipopic2, fiattipopic3, fiattipopic4],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 130, acceleration: '9,2 s', topSpeed: '192 km/h', seats: 5, engine: '1.5 T', color: 'Gris' },
    description:
      "La Fiat Tipo, la berline polyvalente par excellence : spacieuse, fiable et économique. Le choix idéal pour la ville comme pour les longs trajets.",
  },
  {
    id: 'fiat-500-2024',
    brand: 'Fiat',
    model: '500',
    name: 'Fiat 500 2024',
    year: 2024,
    category: 'new',
    price: 0,
    oldPrice: 0,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Bouira, Algérie',
    image: fiat500pic1,
    gallery: [fiat500pic1, fiat500pic2, fiat500pic3],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 70, acceleration: '13,8 s', topSpeed: '160 km/h', seats: 4, engine: '1.0 T', color: 'Rouge' },
    description:
      "La Fiat 500, l'icône italienne au style inimitable : compacte, citadine et pleine de charme. Une voiture qui se gare partout et met de la couleur dans votre quotidien.",
  },
  {
    id: 'skoda-kamiq-gt-2024',
    brand: 'Skoda',
    model: 'Kamiq GT',
    name: 'Skoda Kamiq GT 2024',
    year: 2024,
    category: 'new',
    price: 0,
    oldPrice: 0,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Bouira, Algérie',
    image: kamiqgtpic1,
    gallery: [kamiqgtpic1, kamiqgtpic2, kamiqgtpic3, kamiqgtpic4, kamiqgtpic5],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 150, acceleration: '8,3 s', topSpeed: '210 km/h', seats: 5, engine: '1.5 TSI', color: 'Rouge' },
    description:
      "Le Skoda Kamiq GT, le SUV compact au design sportif et dynamique : moderne, bien équipé et spacieux. Le compagnon idéal pour la ville et les escapades.",
  },
]

export const getCarById = (id) => CARS.find((car) => car.id === id)

export const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(value) + ' / jour'
