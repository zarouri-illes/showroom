import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCheckCircle, FaChartBar, FaCalendarCheck, FaStar, FaEye, FaCoins,
  FaExclamationTriangle, FaClock, FaCar, FaPlus, FaChevronDown, FaChevronUp, FaEnvelopeOpenText, FaExchangeAlt,
} from 'react-icons/fa';
import { useAdmin, isStaleStock, daysSince } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';
import SalesChart from '../../components/SalesChart';
import ImageWithSkeleton from '../../components/ImageWithSkeleton';

const fr = (v) => Number(v || 0).toLocaleString('fr-FR');
const da = (v) => `${fr(v)} DA / jour`;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { cars, reservations, requests, pendingAvisCount, newRequestsCount } = useAdmin();
  const [openId, setOpenId] = useState(null);

  const rentalFleet = cars
    .filter(c => c.status === 'disponible' || !c.status)
    .reduce((sum, c) => sum + (Number(c.price) || 0), 0);

  const availableCount = cars.filter(c => c.status === 'disponible' || !c.status).length;
  const rentedCount = cars.filter(c => c.status === 'louee').length;

  const pendingReservations = reservations.filter(r => r.status === 'en attente').length;
  const totalViews = cars.reduce((s, c) => s + (c.views || 0), 0);

  const requestsThisMonth = requests.filter(r => {
    if (!r.date) return false;
    const d = new Date(r.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const echangeRequests = requests.filter(r =>
    (r.service && String(r.service).toLowerCase().includes('echange')) ||
    (r.service === 'echange')
  ).length;

  const locationRequests = requests.filter(r => r.service === 'location').length;
  const totalServiceRequests = requests.length;

  const statCards = [
    { label: 'Voitures disponibles', value: fr(availableCount), hint: 'à la location', icon: FaCheckCircle, color: 'text-accent', bg: 'bg-accent/10', ring: 'ring-accent/20' },
    { label: 'Voitures louées', value: fr(rentedCount), hint: 'en ce moment', icon: FaCar, color: 'text-emerald-400', bg: 'bg-emerald-400/10', ring: 'ring-emerald-400/20' },
    { label: 'Réservations en attente', value: fr(pendingReservations), hint: 'à confirmer', icon: FaCalendarCheck, color: 'text-sky-400', bg: 'bg-sky-400/10', ring: 'ring-sky-400/20' },
    { label: 'Demandes services', value: fr(requestsThisMonth), hint: 'ce mois-ci', icon: FaEnvelopeOpenText, color: 'text-yellow-400', bg: 'bg-yellow-400/10', ring: 'ring-yellow-400/20' },
    { label: 'Demandes échange/vente', value: fr(echangeRequests), hint: 'estimation & reprise', icon: FaExchangeAlt, color: 'text-violet-400', bg: 'bg-violet-400/10', ring: 'ring-violet-400/20' },
    { label: 'Avis à valider', value: fr(pendingAvisCount), hint: 'en modération', icon: FaStar, color: 'text-violet-400', bg: 'bg-violet-400/10', ring: 'ring-violet-400/20' },
    { label: 'Vues des annonces', value: fr(totalViews), hint: 'sur tout le stock', icon: FaEye, color: 'text-amber-400', bg: 'bg-amber-400/10', ring: 'ring-amber-400/20' },
    { label: 'Revenu locatif / jour', value: da(rentalFleet), hint: 'fleet au complet', icon: FaCoins, color: 'text-pink-400', bg: 'bg-pink-400/10', ring: 'ring-pink-400/20' },
  ];

  const rentedCars = cars.filter(c => c.status === 'louee');
  const topViewed = [...cars]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
  const staleCars = cars
    .filter(isStaleStock)
    .sort((a, b) => daysSince(b.listedAt) - daysSince(a.listedAt))
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Vue d&apos;ensemble
        </p>
        <h1 className="title text-3xl text-white sm:text-4xl">Tableau de bord</h1>
        <p className="mt-2 text-white/50">
          Bienvenue dans votre espace d&apos;administration. Retrouvez ici les chiffres clés de la location et de vos services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {statCards.map(card => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 transition-all hover:border-accent/30">
            <div className={`w-12 h-12 rounded-xl ${card.bg} ring-1 ${card.ring} flex items-center justify-center mb-4`}>
              <card.icon className={card.color} size={22} />
            </div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">{card.value}</p>
            <p className="text-sm text-white/60 mt-1">{card.label}</p>
            <p className="text-xs text-white/40 mt-0.5">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 mb-10">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent flex items-center gap-2">
          <FaEnvelopeOpenText size={13} /> Répartition des demandes services
        </h2>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-2 text-white/70">
            <FaCar className="text-sky-400" size={13} /> Location
          </span>
          <span className="font-bold text-white">{fr(locationRequests)}</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-sky-400 transition-all duration-700"
            style={{ width: `${totalServiceRequests ? Math.round((locationRequests / totalServiceRequests) * 100) : 0}%` }}
          />
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-2 text-white/70">
            <FaExchangeAlt className="text-violet-400" size={13} /> Échange &amp; Vente
          </span>
          <span className="font-bold text-white">{fr(echangeRequests)}</span>
        </div>
        <div className="mt-2 h-2.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-violet-400 transition-all duration-700"
            style={{ width: `${totalServiceRequests ? Math.round((echangeRequests / totalServiceRequests) * 100) : 0}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 mb-10">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent flex items-center gap-2">
          <FaChartBar size={13} /> Évolution des réservations
        </h2>
        <SalesChart reservations={reservations} cars={cars} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-warning flex items-center gap-2">
            <FaExclamationTriangle size={13} /> Alertes stock
          </h2>
          {staleCars.length === 0 ? (
            <p className="text-sm text-white/50">Aucune voiture en ligne depuis plus de 30 jours. Bravo !</p>
          ) : (
            <div className="space-y-2">
              {staleCars.map(car => (
                <button
                  key={car.id}
                  onClick={() => navigate(`/admin/cars/${car.id}/edit`)}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer text-left"
                >
                  <ImageWithSkeleton src={car.images[0]} alt={car.model} className="w-14 h-10 rounded-lg shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white truncate">{car.brand} {car.model}</span>
                    <span className="block text-xs text-white/50 truncate">{da(car.price)}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-warning flex-shrink-0 whitespace-nowrap">
                    <FaClock size={11} />
                    {daysSince(car.listedAt)}+ j
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent flex items-center gap-2">
            <FaEye size={13} /> Voitures les plus vues
          </h2>
          {topViewed.length === 0 || (topViewed[0].views || 0) === 0 ? (
            <p className="text-sm text-white/50">Aucune vue pour le moment.</p>
          ) : (
            <div className="space-y-2">
              {topViewed.map((car, i) => (
                <button
                  key={car.id}
                  onClick={() => navigate(`/admin/cars/${car.id}/edit`)}
                  className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer text-left"
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0 ? 'bg-accent text-black' : 'bg-white/5 text-white/50'
                  }`}>
                    {i + 1}
                  </span>
                  <ImageWithSkeleton src={car.images[0]} alt={car.model} className="w-14 h-10 rounded-lg shrink-0" />
                  <span className="min-w-0 flex-1 text-sm font-medium text-white truncate">{car.brand} {car.model}</span>
                  <span className="flex items-center gap-1.5 text-xs text-white/50 flex-shrink-0">
                    <FaEye size={12} className="text-accent" />
                    {car.views}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Voitures louées</h2>
          {rentedCars.length === 0 ? (
            <p className="text-sm text-white/50">Aucune voiture louée pour le moment.</p>
          ) : (
            <div className="space-y-1">
              {rentedCars.map(car => (
                <div key={car.id}>
                  <button
                    onClick={() => setOpenId(openId === car.id ? null : car.id)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer text-left"
                  >
                    <span className="text-sm font-medium text-white">{car.brand} {car.model}</span>
                    {openId === car.id ? <FaChevronUp className="text-white/50 flex-shrink-0" size={11} /> : <FaChevronDown className="text-white/50 flex-shrink-0" size={11} />}
                  </button>
                  {openId === car.id && (
                    <div className="flex items-center justify-between px-3 py-2 mb-1 bg-white/[0.03] rounded-xl text-sm ml-2">
                      <span className="text-white/50">ID <span className="text-white font-medium">{car.id}</span></span>
                      <span className="text-accent font-extrabold">{da(car.price)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Actions rapides</h2>
          <div className="space-y-2">
            <button onClick={() => navigate('/admin/cars/new')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-black text-sm font-bold hover:bg-white transition-all cursor-pointer">
              <FaPlus size={12} /> Ajouter une voiture
            </button>
            <button onClick={() => navigate('/admin/demandes')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-accent/40 hover:text-accent text-white/70 transition-all text-sm cursor-pointer text-left">
              <FaEnvelopeOpenText size={12} className="flex-shrink-0" /> Voir les demandes {newRequestsCount > 0 && `(${newRequestsCount} nouvelles)`}
            </button>
            <button onClick={() => navigate('/admin/cars')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-accent/40 hover:text-accent text-white/70 transition-all text-sm cursor-pointer text-left">
              <FaCar size={12} className="flex-shrink-0" /> Modifier le stock
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
