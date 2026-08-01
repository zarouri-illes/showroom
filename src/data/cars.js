import audia6 from '../assets/cars/audia6.jpg'
import audiq2 from '../assets/cars/audiq2.jfif'
import audiq3 from '../assets/cars/audiq3.jpg'
import jetourImg from '../assets/cars/jetour.jpg'
import macanImg from '../assets/cars/macan.jfif'
import svrImg from '../assets/cars/svr.webp'
import turbosImg from '../assets/cars/turbos.jpg'

export const CATEGORIES = [
  { value: 'new', label: 'Voitures neuves' },
  { value: 'used', label: "Voitures d'occasion" },
  { value: 'stock', label: 'En stock' },
]

export const CAR_BRANDS = [
  { value: 'audi', label: 'Audi' },
  { value: 'jetour', label: 'Jetour' },
  { value: 'porsche', label: 'Porsche' },
  { value: 'land rover', label: 'Land Rover' },
]

export const SORT_OPTIONS = [
  { value: 'featured', label: 'En vedette' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Les plus récents' },
]

export const CARS = [
  {
    id: 'audi-a6-2024',
    brand: 'Audi',
    model: 'A6',
    name: 'Audi A6 2024',
    year: 2024,
    category: 'new',
    price: 68500,
    oldPrice: 72000,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Herkat, Bouria, Algérie',
    image: audia6,
    gallery: [audia6],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 340, acceleration: '5,1 s', topSpeed: '250 km/h', seats: 5, engine: '3.0 V6 TFSI', color: 'Noir mythos' },
    description:
      "L'Audi A6, la berline de luxe allemande par excellence : élégance, technologies de pointe et confort de très haut niveau. Un compagnon de route raffiné pour tous les trajets.",
  },
  {
    id: 'audi-q2-2024',
    brand: 'Audi',
    model: 'Q2',
    name: 'Audi Q2 2024',
    year: 2024,
    category: 'new',
    price: 34900,
    oldPrice: 36900,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Herkat, Bouria, Algérie',
    image: audiq2,
    gallery: [audiq2],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 150, acceleration: '8,7 s', topSpeed: '212 km/h', seats: 5, engine: '1.5 TSI', color: 'Gris Nardo' },
    description:
      "Le nouveau Audi Q2 allie style urbain et polyvalence. Compact, connecté et équipé des dernières technologies d'assistance, il est idéal pour la ville comme pour les escapades du week-end.",
  },
  {
    id: 'jetour-x70-2024',
    brand: 'Jetour',
    model: 'X70 Plus',
    name: 'Jetour X70 Plus 2024',
    year: 2024,
    category: 'new',
    price: 29900,
    oldPrice: 31900,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Herkat, Bouria, Algérie',
    image: jetourImg,
    gallery: [jetourImg],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 197, acceleration: '8,4 s', topSpeed: '210 km/h', seats: 7, engine: '1.6T', color: 'Blanc nacré' },
    description:
      "Le Jetour X70 Plus offre un excellent rapport équipements/prix : spacieux, technologique et confortable, avec un design affirmé et une dotation généreuse dès la version de base.",
  },
  {
    id: 'porsche-macan-2024',
    brand: 'Porsche',
    model: 'Macan',
    name: 'Porsche Macan 2024',
    year: 2024,
    category: 'new',
    price: 79900,
    oldPrice: 84900,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Herkat, Bouria, Algérie',
    image: macanImg,
    gallery: [macanImg],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 265, acceleration: '6,2 s', topSpeed: '232 km/h', seats: 5, engine: '2.0 turbo', color: 'Noir' },
    description:
      "Le Porsche Macan est le SUV sportif par excellence : un châssis affûté, une direction précise et un confort premium. Le plaisir de conduite Porsche au quotidien.",
  },
  {
    id: 'audi-q3-2023',
    brand: 'Audi',
    model: 'Q3',
    name: 'Audi Q3 2023',
    year: 2023,
    category: 'used',
    price: 39500,
    oldPrice: 44000,
    mileage: 12500,
    fuel: 'Diesel',
    transmission: 'Automatique',
    location: 'Herkat, Bouria, Algérie',
    image: audiq3,
    gallery: [audiq3],
    featured: true,
    specs: { hp: 200, acceleration: '7,3 s', topSpeed: '224 km/h', seats: 5, engine: '2.0 TDI', color: 'Bleu Navarra' },
    description:
      "L'Audi Q3 d'occasion en excellent état, avec un entretien complet chez le concessionnaire. Compact premium, spacieux et économique, avec garantie 12 mois incluse.",
  },
  {
    id: 'range-rover-svr-2023',
    brand: 'Land Rover',
    model: 'Range Rover Sport SVR',
    name: 'Range Rover Sport SVR 2023',
    year: 2023,
    category: 'used',
    price: 148000,
    oldPrice: 165000,
    mileage: 18000,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Herkat, Bouria, Algérie',
    image: svrImg,
    gallery: [svrImg],
    featured: true,
    badge: 'Sport',
    specs: { hp: 635, acceleration: '3,8 s', topSpeed: '280 km/h', seats: 5, engine: 'V8 5.0 L suralimenté', color: 'Vert Lantau' },
    description:
      "Le Range Rover Sport SVR, la version la plus performante de la gamme : 635 chevaux, un raffinement anglais et des capacités tout-terrain inégalées. Un SUV d'exception à l'état quasi neuf.",
  },
  {
    id: 'porsche-911-turbo-s-2023',
    brand: 'Porsche',
    model: '911 Turbo S',
    name: 'Porsche 911 Turbo S 2023',
    year: 2023,
    category: 'used',
    price: 229000,
    oldPrice: 250000,
    mileage: 9500,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Herkat, Bouria, Algérie',
    image: turbosImg,
    gallery: [turbosImg],
    featured: true,
    badge: 'Haute performance',
    specs: { hp: 650, acceleration: '2,7 s', topSpeed: '330 km/h', seats: 4, engine: '6 cyl. à plat 3.8 L biturbo', color: 'Gris arctique' },
    description:
      "La Porsche 911 Turbo S, l'icône absolue : 650 chevaux, 0 à 100 km/h en 2,7 secondes et une tenue de route légendaire. Un exemplaire exceptionnel, parfaitement entretenu.",
  },
]

export const getCarById = (id) => CARS.find((car) => car.id === id)

export const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
