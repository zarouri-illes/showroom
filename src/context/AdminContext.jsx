import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cars as seedCars } from '../data/admin/cars';

const AdminContext = createContext(null);

const CARS_KEY = 'admin_cars';
const CARS_VERSION_KEY = 'admin_cars_version';
const CARS_SEED_VERSION = 'frereauto10-cars-v4';
const CONTENT_KEY = 'admin_content';
const RESERVATIONS_KEY = 'admin_reservations';
const AVIS_KEY = 'admin_avis';
const CREDENTIALS_KEY = 'admin_credentials';
const REQUESTS_KEY = 'admin_requests';
const REQUESTS_VERSION_KEY = 'admin_requests_version';
const REQUESTS_SEED_VERSION = 'frereauto10-requests-v3';

const defaultCredentials = {
  email: 'admin@showroom.fr',
  password: 'admin123',
};

const defaultContent = {
  email: 'contact@autoshowroom.fr',
  phone: '01 23 45 67 89',
  address: 'En face AB park',
  city: 'Bouira, Algérie',
  gps: { lat: 36.3788, lng: 3.8938 },
  histoire: 'Fondé en 2010, Auto Showroom est le leader de la vente de véhicules premium en Algérie. Nous sélectionnons rigoureusement chaque véhicule pour garantir qualité et fiabilité à nos clients. Notre showroom situé au cœur de Bouira vous accueille 7 jours sur 7.',
  adresse_detail: 'En face AB park, Bouira, Algérie, 10000',
  valeurs: ['Transparence totale', 'Qualité garantie', 'Service client premium', 'Prix compétitifs', 'Financement flexible'],
  social: {
    instagram: 'https://instagram.com/autoshowroom',
    facebook: 'https://facebook.com/autoshowroom',
    tiktok: 'https://tiktok.com/@autoshowroom',
    whatsapp: 'https://wa.me/21321123456',
  },
  contact_email: 'contact@autoshowroom.dz',
  contact_phone: '+213 33 123 456',
  contact_address: 'En face AB park, Bouira, Algérie, 10000',
  maps_url: 'https://www.google.com/maps?q=En%20face%20AB%20park%2C%20Bouira%2C%20Algeria%2010000&output=embed',
  stats: {
    voitures_vendues: 1250,
    clients_satisfaits: 980,
    annees_experience: 15,
    marques_disponibles: 25,
  },
};

const defaultReservations = [
  { id: 1, customer: 'Jean Dupont', email: 'jean@email.com', phone: '06 12 34 56 78', carId: 1, carName: 'BMW X5 M60i', date: '2025-03-15', status: 'confirmée' },
  { id: 2, customer: 'Marie Martin', email: 'marie@email.com', phone: '06 98 76 54 32', carId: 5, carName: 'Volkswagen Golf 8 R', date: '2025-03-12', status: 'en attente' },
  { id: 3, customer: 'Pierre Durand', email: 'pierre@email.com', phone: '06 45 67 89 01', carId: 4, carName: 'Toyota Land Cruiser 300', date: '2025-03-08', status: 'terminée' },
];

const defaultAvis = [
  { id: 1, name: 'Karim B.', note: 5, comment: 'Excellent service ! J\'ai achete ma BMW X5 chez eux, le conseiller etait tres professionnel et m\'a accompagne jusqu\'a la livraison. Je recommande vivement.', date: '2024-03-15', visible: true },
  { id: 2, name: 'Sarah M.', note: 5, comment: 'Showroom magnifique avec un large choix de vehicules. J\'ai trouve la voiture de mes reves a un prix imbattable. Merci a toute l\'equipe !', date: '2024-04-02', visible: true },
  { id: 3, name: 'Mohamed L.', note: 4, comment: 'Tres bonne experience globale. Le personnel est a l\'ecoute et les vehicules sont de qualite. Seul petit bemol : le delai de livraison un peu long.', date: '2024-05-20', visible: true },
  { id: 4, name: 'Fatima Z.', note: 5, comment: 'Un grand merci a Auto Showroom pour leur professionnalisme. J\'ai ete conseillee au mieux pour choisir le vehicule adapte a mes besoins.', date: '2024-06-10', visible: true },
  { id: 5, name: 'Amine K.', note: 4, comment: 'Rapport qualite-prix excellent. Le showroom est bien agence et l\'equipe commerciale est sympathique et sans pression.', date: '2024-07-05', visible: true },
  { id: 6, name: 'Nadia R.', note: 5, comment: 'Je suis ravie de mon achat ! Procedure simple et rapide. Je reviendrai sans hesiter pour mon prochain vehicule.', date: '2024-08-18', visible: true },
];

const defaultRequests = [
  {
    id: 9001,
    date: '2025-08-10',
    status: 'nouvelle',
    nom: 'Karim Benali',
    telephone: '05 60 12 34 56',
    email: 'karim.benali@example.com',
    ville: 'Bouira',
    service: 'location',
    duree: '1 semaine',
    message: 'Bonjour, je souhaite louer un SUV pour une semaine fin août. Idéalement un véhicule automatique récent. Merci de me confirmer la disponibilité.',
  },
  {
    id: 9002,
    date: '2025-08-06',
    status: 'en cours',
    nom: 'Sarah Meziane',
    telephone: '07 71 22 33 44',
    email: 'sarah.meziane@example.com',
    ville: 'Blida',
    service: 'echange',
    brand: 'Audi',
    model: 'A4',
    year: '2019',
    mileage: '68000',
    fuel: 'Diesel',
    transmission: 'Automatique',
    engine: '2.0 TDI 150 ch',
    color: 'Blanc',
    category: "D'occasion",
    demandeType: 'echange',
    prixSouhaite: '3800000',
    message: 'Je souhaite échanger mon Audi A4 contre un SUV plus récent. Véhicule bien entretenu, carnet à jour, aucun accident.',
  },
  {
    id: 9003,
    date: '2025-08-02',
    status: 'contactee',
    nom: 'Amine Bouzid',
    telephone: '05 55 44 33 22',
    email: 'amine.bouzid@example.com',
    ville: 'Bouira',
    service: 'location',
    duree: '1 mois',
    message: 'Je cherche une voiture à louer au mois pour mes déplacements professionnels. Kilométrage illimité souhaité. Merci de me proposer vos tarifs.',
  },
  {
    id: 9004,
    date: '2025-07-29',
    status: 'terminee',
    nom: 'Yacine Hamdani',
    telephone: '06 33 22 11 00',
    email: 'yacine.hamdani@example.com',
    ville: 'Bouira',
    service: 'echange',
    brand: 'Volkswagen',
    model: 'Golf 7',
    year: '2017',
    mileage: '95000',
    fuel: 'Essence',
    transmission: 'Manuelle',
    engine: '1.4 TSI 140 ch',
    color: 'Noir',
    category: "D'occasion",
    demandeType: 'vente',
    prixSouhaite: '2200000',
    message: 'Je souhaite vendre ma Golf 7. Véhicule propre, entretenu chez le concessionnaire, pneus neufs.',
  },
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
}

function safeParse(raw) {
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed;
  } catch { return null; }
}

function persistMerged(key, value, isArray) {
  const fresh = safeParse(localStorage.getItem(key));
  if (isArray) {
    const list = Array.isArray(fresh) ? fresh : [];
    const ids = new Set(value.map(i => i && i.id).filter(Boolean));
    const extra = list.filter(i => i && i.id && !ids.has(i.id));
    localStorage.setItem(key, JSON.stringify([...value, ...extra]));
  } else {
    const base = fresh && typeof fresh === 'object' ? fresh : {};
    localStorage.setItem(key, JSON.stringify({ ...base, ...value }));
  }
}

export function daysSince(dateStr) {
  if (!dateStr) return 0;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24)));
}

export function isStaleStock(car) {
  const available = car.status === 'disponible' || !car.status;
  return available && daysSince(car.listedAt) >= 30;
}

export function AdminProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const saved = loadData(CARS_KEY, null);
    const savedVersion = loadData(CARS_VERSION_KEY, null);
    const base =
      Array.isArray(saved) && saved.length > 0 && savedVersion === CARS_SEED_VERSION
        ? saved
        : seedCars.map(c => ({ ...c, status: c.status || 'disponible', views: c.views || 0 }));
    return base.map((c, i) => ({
      ...c,
      views: c.views || 0,
      listedAt: c.listedAt || new Date(Date.now() - (30 + (i % 4) * 7) * 86400000).toISOString().split('T')[0],
    }));
  });

  const [content, setContent] = useState(() => {
    const saved = loadData(CONTENT_KEY, null);
    return saved ? { ...defaultContent, ...saved } : defaultContent;
  });
  const [reservations, setReservations] = useState(() => loadData(RESERVATIONS_KEY, defaultReservations));
  const [nextReservationId, setNextReservationId] = useState(() => {
    const saved = loadData(RESERVATIONS_KEY, defaultReservations);
    return saved.length > 0 ? Math.max(...saved.map(r => r.id)) + 1 : 1;
  });
  const [avis, setAvis] = useState(() => loadData(AVIS_KEY, defaultAvis));
  const [nextAvisId, setNextAvisId] = useState(() => {
    const saved = loadData(AVIS_KEY, defaultAvis);
    return saved.length > 0 ? Math.max(...saved.map(r => r.id)) + 1 : 1;
  });
  const [requests, setRequests] = useState(() => {
    const saved = loadData(REQUESTS_KEY, null);
    const savedVersion = loadData(REQUESTS_VERSION_KEY, null);
    const base =
      Array.isArray(saved) && savedVersion === REQUESTS_SEED_VERSION
        ? saved
        : defaultRequests;
    return base;
  });
  const [credentials, setCredentials] = useState(() => loadData(CREDENTIALS_KEY, defaultCredentials));

  useEffect(() => {
    const savedVersion = loadData(CARS_VERSION_KEY, null);
    if (savedVersion !== CARS_SEED_VERSION) {
      localStorage.setItem(CARS_KEY, JSON.stringify(cars));
    } else {
      persistMerged(CARS_KEY, cars, Array.isArray);
    }
    localStorage.setItem(CARS_VERSION_KEY, CARS_SEED_VERSION);
  }, [cars]);
  useEffect(() => { persistMerged(CONTENT_KEY, content, false); }, [content]);
  useEffect(() => { persistMerged(RESERVATIONS_KEY, reservations, Array.isArray); }, [reservations]);
  useEffect(() => { localStorage.setItem('admin_next_reservation_id', JSON.stringify(nextReservationId)); }, [nextReservationId]);
  useEffect(() => { persistMerged(AVIS_KEY, avis, Array.isArray); }, [avis]);
  useEffect(() => { persistMerged(REQUESTS_KEY, requests, Array.isArray); }, [requests]);
  useEffect(() => {
    const savedVersion = loadData(REQUESTS_VERSION_KEY, null);
    if (savedVersion !== REQUESTS_SEED_VERSION) {
      localStorage.setItem(REQUESTS_VERSION_KEY, REQUESTS_SEED_VERSION);
    }
  }, []);
  useEffect(() => { persistMerged(CREDENTIALS_KEY, credentials, false); }, [credentials]);

  const refreshFromStorage = useCallback((key, raw) => {
    if (key === CARS_KEY) {
      const data = safeParse(raw);
      if (data) setCars(data);
    } else if (key === CONTENT_KEY) {
      const data = safeParse(raw);
      if (data) setContent({ ...defaultContent, ...data });
    } else if (key === RESERVATIONS_KEY) {
      const data = safeParse(raw);
      if (data) {
        setReservations(data);
        setNextReservationId(data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1);
      }
    } else if (key === AVIS_KEY) {
      const data = safeParse(raw);
      if (data) {
        setAvis(data);
        setNextAvisId(data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1);
      }
    } else if (key === REQUESTS_KEY) {
      const data = safeParse(raw);
      if (data) setRequests(data);
    } else if (key === CREDENTIALS_KEY) {
      const data = safeParse(raw);
      if (data) setCredentials(prev => ({ ...prev, ...data }));
    }
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key || e.newValue === null) return;
      if ([CARS_KEY, CONTENT_KEY, RESERVATIONS_KEY, AVIS_KEY, REQUESTS_KEY, CREDENTIALS_KEY].includes(e.key)) {
        refreshFromStorage(e.key, e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [refreshFromStorage]);

  const updateCredentials = useCallback((data) => {
    setCredentials(prev => ({ ...prev, ...data }));
  }, []);

  const addCar = useCallback((car) => {
    const images = car.images?.filter(Boolean);
    const newCar = {
      ...car,
      id: Date.now(),
      badge: 'Nouveau',
      images: images?.length ? images : ['/images.jfif'],
      soldDate: car.status === 'vendue' ? new Date().toISOString().split('T')[0] : undefined,
      views: car.views || 0,
      listedAt: car.listedAt || new Date().toISOString().split('T')[0],
    };
    setCars(prev => [...prev, newCar]);
    return newCar;
  }, []);

  const incrementCarViews = useCallback((id) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, views: (c.views || 0) + 1 } : c));
  }, []);

  const updateCar = useCallback((id, data) => {
    const update = { ...data };
    if (update.images) update.images = update.images.filter(Boolean);
    setCars(prev => prev.map(c => {
      if (c.id !== id) return c;
      const wasSold = c.status === 'vendue';
      const isSold = update.status === 'vendue';
      let next = { ...c, ...update };
      if (!wasSold && isSold) {
        next.soldDate = new Date().toISOString().split('T')[0];
      } else if (wasSold && !isSold) {
        delete next.soldDate;
      }
      return next;
    }));
  }, []);

  const deleteCar = useCallback((id) => {
    setCars(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateContent = useCallback((data) => {
    setContent(prev => ({ ...prev, ...data }));
  }, []);

  const addReservation = useCallback((r) => {
    const newR = { ...r, id: nextReservationId, date: new Date().toISOString().split('T')[0], status: 'en attente' };
    setNextReservationId(prev => prev + 1);
    setReservations(prev => [...prev, newR]);
    return newR;
  }, [nextReservationId]);

  const updateReservation = useCallback((id, data) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  }, []);

  const updateReservationStatus = useCallback((id, status) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, []);

  const deleteReservation = useCallback((id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  }, []);

  const addAvis = useCallback((data) => {
    const newAvis = { ...data, id: nextAvisId, visible: false };
    setNextAvisId(prev => prev + 1);
    setAvis(prev => [...prev, newAvis]);
    return newAvis;
  }, [nextAvisId]);

  const toggleAvisVisibility = useCallback((id) => {
    setAvis(prev => prev.map(a => a.id === id ? { ...a, visible: !a.visible } : a));
  }, []);

  const addRequest = useCallback((data) => {
    const newRequest = {
      ...data,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'nouvelle',
    };
    setRequests(prev => [newRequest, ...prev]);
    return newRequest;
  }, []);

  const updateRequestStatus = useCallback((id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, []);

  const deleteRequest = useCallback((id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  }, []);

  const stats = {
    total: cars.length,
    disponibles: cars.filter(c => c.status === 'disponible' || !c.status).length,
    vendues: cars.filter(c => c.status === 'vendue').length,
  };

  const pendingAvisCount = avis.filter(a => !a.visible).length;
  const newRequestsCount = requests.filter(r => r.status === 'nouvelle').length;

  return (
    <AdminContext.Provider value={{
      cars, addCar, updateCar, deleteCar, incrementCarViews,
      content, updateContent,
      reservations, addReservation, updateReservation, updateReservationStatus, deleteReservation,
      avis, addAvis, toggleAvisVisibility,
      requests, addRequest, updateRequestStatus, deleteRequest,
      credentials, updateCredentials,
      pendingAvisCount,
      newRequestsCount,
      stats,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
