import urus from '../assets/Lamborghini-Urus-removebg.png'
import lambo from '../assets/Lamborghini-PNG-Isolated-Photo.png'
import aventador from '../assets/2020-Lamborghini-Aventador-SVJ-Roadster-008-2160.jpg'
import sideLambo from '../assets/Side-View-Lamborghini-Car-PNG-Photos.png'
import showroom from '../assets/wallpaperflare.com_wallpaper.jpg'

export const CATEGORIES = [
  { value: 'new', label: 'Voitures neuves' },
  { value: 'used', label: "Voitures d'occasion" },
  { value: 'stock', label: 'En stock' },
]

export const CAR_BRANDS = [{ value: 'lamborghini', label: 'Lamborghini' }]

export const SORT_OPTIONS = [
  { value: 'featured', label: 'En vedette' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Les plus récents' },
]

export const CARS = [
  {
    id: 'urus-2025',
    brand: 'Lamborghini',
    model: 'Urus',
    name: 'Lamborghini Urus 2025',
    year: 2025,
    category: 'new',
    price: 230000,
    oldPrice: 250000,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Paris, France',
    image: urus,
    gallery: [urus, sideLambo, showroom],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 666, acceleration: '3,6 s', topSpeed: '305 km/h', seats: 5 },
    description:
      "Le SUV sportif ultime : 666 chevaux, un design agressif et un confort inégalé. Le Lamborghini Urus allie la polyvalence d'un SUV à la performance brute d'une supercar, avec un intérieur en cuir raffiné et les dernières technologies d'assistance à la conduite.",
  },
  {
    id: 'huracan-evo',
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    name: 'Lamborghini Huracán EVO 2024',
    year: 2024,
    category: 'new',
    price: 285000,
    oldPrice: 299000,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Lyon, France',
    image: lambo,
    gallery: [lambo, sideLambo],
    featured: true,
    badge: 'Nouveau',
    specs: { hp: 640, acceleration: '2,9 s', topSpeed: '325 km/h', seats: 2 },
    description:
      "La Huracán EVO offre un moteur V10 atmosphérique de 640 chevaux et une agilité exceptionnelle. Dynamique de conduite améliorée, aérodynamique affinée et intérieur orienté pilote font de cette voiture une référence absolue sur circuit comme sur route.",
  },
  {
    id: 'aventador-svj',
    brand: 'Lamborghini',
    model: 'Aventador SVJ',
    name: 'Lamborghini Aventador SVJ Roadster',
    year: 2022,
    category: 'stock',
    price: 540000,
    oldPrice: 600000,
    mileage: 1200,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Nice, France',
    image: aventador,
    gallery: [aventador, lambo, sideLambo],
    featured: true,
    badge: 'Rare',
    specs: { hp: 770, acceleration: '2,8 s', topSpeed: '350 km/h', seats: 2 },
    description:
      "L'Aventador SVJ Roadster est une pièce de collection : 770 chevaux, un record du Nürburgring et un toit amovible. Un véhicule extrême réservé aux passionnés, livré avec un historique complet et un entretien certifié Lamborghini.",
  },
  {
    id: 'urus-s-used',
    brand: 'Lamborghini',
    model: 'Urus S',
    name: 'Lamborghini Urus S 2023',
    year: 2023,
    category: 'used',
    price: 180000,
    oldPrice: 205000,
    mileage: 18500,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Bordeaux, France',
    image: urus,
    gallery: [urus, showroom],
    featured: true,
    specs: { hp: 657, acceleration: '3,5 s', topSpeed: '305 km/h', seats: 5 },
    description:
      "L'Urus S d'occasion, en parfait état, avec un entretien complet chez le concessionnaire. 657 chevaux, un confort quotidien inégalé et une garantie 12 mois incluse. Idéal pour allier sportivité et usage familial.",
  },
  {
    id: 'aventador-s-used',
    brand: 'Lamborghini',
    model: 'Aventador S',
    name: 'Lamborghini Aventador S 2020',
    year: 2020,
    category: 'used',
    price: 320000,
    oldPrice: 380000,
    mileage: 9000,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Paris, France',
    image: lambo,
    gallery: [lambo, aventador],
    specs: { hp: 740, acceleration: '2,9 s', topSpeed: '350 km/h', seats: 2 },
    description:
      "L'Aventador S, fleuron de Lamborghini, avec seulement 9 000 km au compteur. Moteur V12 de 740 chevaux, livrée complète avec son coffret d'origine et son historique d'entretien Lamborghini. Une valeur sûre pour les collectionneurs.",
  },
  {
    id: 'urus-performante',
    brand: 'Lamborghini',
    model: 'Urus Performante',
    name: 'Lamborghini Urus Performante 2024',
    year: 2024,
    category: 'new',
    price: 260000,
    oldPrice: 275000,
    mileage: 0,
    fuel: 'Essence',
    transmission: 'Automatique',
    location: 'Marseille, France',
    image: sideLambo,
    gallery: [sideLambo, urus],
    badge: 'Nouveau',
    specs: { hp: 666, acceleration: '3,3 s', topSpeed: '306 km/h', seats: 5 },
    description:
      "L'Urus Performante est la version la plus extrême du SUV italien : 666 chevaux, une carrosserie en carbone allégée et un châssis recalibré pour une précision absolue. Sur route comme sur piste, il redéfinit le segment des SUV de performance.",
  },
  {
    id: 'revuelto',
    brand: 'Lamborghini',
    model: 'Revuelto',
    name: 'Lamborghini Revuelto 2025',
    year: 2025,
    category: 'stock',
    price: 620000,
    oldPrice: 650000,
    mileage: 500,
    fuel: 'Hybride',
    transmission: 'Automatique',
    location: 'Genève, Suisse',
    image: showroom,
    gallery: [showroom, lambo, aventador],
    badge: 'Exclusif',
    specs: { hp: 1015, acceleration: '2,5 s', topSpeed: '350 km/h', seats: 2 },
    description:
      "La Revuelto est l'héritière des légendaires V12 Lamborghini, désormais hybride avec 1 015 chevaux. Premier HPEV de la marque, elle combine trois moteurs électriques et un V12 atmosphérique pour des performances inouïes.",
  },
  {
    id: 'gallardo-2015',
    brand: 'Lamborghini',
    model: 'Gallardo',
    name: 'Lamborghini Gallardo 2015',
    year: 2015,
    category: 'used',
    price: 120000,
    oldPrice: 140000,
    mileage: 32000,
    fuel: 'Essence',
    transmission: 'Manuelle',
    location: 'Toulouse, France',
    image: sideLambo,
    gallery: [sideLambo, lambo],
    specs: { hp: 560, acceleration: '3,7 s', topSpeed: '325 km/h', seats: 2 },
    description:
      "La Gallardo, l'une des plus belles sportives de sa génération, avec transmission manuelle. 560 chevaux, 32 000 km, historique d'entretien irréprochable. Un plaisir de conduite authentique à un prix accessible.",
  },
]

export const getCarById = (id) => CARS.find((car) => car.id === id)

export const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
