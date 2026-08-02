import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCheck, FaTimes, FaClock, FaEye, FaStar } from 'react-icons/fa';
import { useAdmin, isStaleStock } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';
import ImageWithSkeleton from '../../components/ImageWithSkeleton';

const fr = (v) => Number(v || 0).toLocaleString('fr-FR');
const da = (v) => `${fr(v)} DA / jour`;

const categoryLabels = { new: 'Neuf', used: 'Occasion', stock: 'En stock' };

function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onCancel}>
      <div className="bg-dark-card rounded-2xl border border-dark-border p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-dark-text mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-dark-border text-sm font-medium text-gray-300 hover:bg-dark-bg transition-all cursor-pointer">Annuler</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all cursor-pointer">Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCars() {
  const navigate = useNavigate();
  const { cars, updateCar, deleteCar } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceValue, setPriceValue] = useState('');

  const filtered = cars.filter(c => {
    const matchSearch = !search || `${c.brand} ${c.model} ${c.year}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleQuickPrice = (car) => {
    setEditingPrice(car.id);
    setPriceValue(String(car.price));
  };

  const savePrice = (id) => {
    const num = Number(priceValue);
    if (!isNaN(num) && num > 0) {
      updateCar(id, { price: num });
    }
    setEditingPrice(null);
  };

  const changeStatus = (car, status) => {
    if (car.status !== status) updateCar(car.id, { status });
  };

  const availableCount = cars.filter(c => c.status === 'disponible' || !c.status).length;

  return (
    <AdminLayout>
      <ConfirmModal
        show={!!deleteTarget}
        title="Supprimer cette voiture ?"
        message={`Es-tu sûr de vouloir supprimer ${deleteTarget?.brand} ${deleteTarget?.model} ? Cette action est irréversible.`}
        onConfirm={() => { deleteCar(deleteTarget.id); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Gestion des véhicules
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="title text-3xl text-white">Stock / Voitures</h1>
            <p className="mt-2 text-sm text-white/50">{availableCount} disponibles · {cars.length} au total</p>
          </div>
          <button onClick={() => navigate('/admin/cars/new')} className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-black text-sm font-bold hover:bg-white transition-all cursor-pointer">
            <FaPlus size={12} /> Ajouter
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={13} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par marque, modèle ou année…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-white/30"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="w-full sm:w-44 px-4 py-2.5 rounded-xl bg-dark-bg border border-white/10 text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all appearance-none cursor-pointer"
        >
          <option value="">Tous les statuts</option>
          <option value="disponible">Disponible</option>
          <option value="louee">Louée</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <p className="text-base">Aucun véhicule trouvé.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(car => (
            <article key={car.id} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4 hover:border-accent/40 hover:bg-white/[0.04] transition-all">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative w-full sm:w-36 h-36 sm:h-28 rounded-xl overflow-hidden bg-dark-bg flex-shrink-0">
                  <ImageWithSkeleton src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full" />
                  {car.status === 'louee' ? (
                    <span className="absolute left-2 top-2 rounded-full bg-blue-400 px-2.5 py-0.5 text-[10px] font-bold text-black">Louée</span>
                  ) : (
                    <span className="absolute left-2 top-2 rounded-full bg-success px-2.5 py-0.5 text-[10px] font-bold text-black">Disponible</span>
                  )}
                  {isStaleStock(car) && (
                    <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold text-black">
                      <FaClock size={9} /> 30+ j
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white truncate flex items-center gap-2">
                        {car.brand} {car.model}
                        {car.featured && <FaStar size={13} className="text-accent flex-shrink-0" title="En vedette" />}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-white/60">{car.year}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-white/60">
                          {car.mileage ? `${fr(car.mileage)} km` : 'Neuf'}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-white/60">{car.fuel}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-white/60">{categoryLabels[car.category] || 'Stock'}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-white/60">
                          <FaEye size={9} /> {fr(car.views)} vues
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {editingPrice === car.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={priceValue}
                            onChange={e => setPriceValue(e.target.value)}
                            className="w-28 px-2 py-1.5 rounded-lg bg-dark-bg border border-accent text-dark-text text-sm outline-none"
                            autoFocus
                            onKeyDown={e => { if (e.key === 'Enter') savePrice(car.id); if (e.key === 'Escape') setEditingPrice(null); }}
                          />
                          <button onClick={() => savePrice(car.id)} className="w-8 h-8 rounded-lg bg-success/15 text-success hover:bg-success/25 flex items-center justify-center transition-all cursor-pointer" title="Enregistrer"><FaCheck size={11} /></button>
                          <button onClick={() => setEditingPrice(null)} className="w-8 h-8 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer" title="Annuler"><FaTimes size={11} /></button>
                        </div>
                      ) : (
                        <button onClick={() => handleQuickPrice(car)} className="block ml-auto text-right cursor-pointer group/price" title="Cliquer pour modifier le prix">
                          {car.oldPrice > car.price && <span className="block text-[11px] text-white/30 line-through">{da(car.oldPrice)}</span>}
                          <span className="text-base font-extrabold text-accent group-hover/price:underline">{da(car.price)}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 mt-3">
                    <div className="inline-flex rounded-full border border-white/10 bg-dark-bg p-0.5">
                      <button
                        onClick={() => changeStatus(car, 'disponible')}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          (car.status === 'disponible' || !car.status)
                            ? 'bg-success/20 text-success'
                            : 'text-white/40 hover:text-white'
                        }`}
                      >
                        Disponible
                      </button>
                      <button
                        onClick={() => changeStatus(car, 'louee')}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          car.status === 'louee'
                            ? 'bg-blue-400/20 text-blue-400'
                            : 'text-white/40 hover:text-white'
                        }`}
                      >
                        Louée
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(`/admin/cars/${car.id}/edit`)} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white/70 bg-white/5 border border-white/10 hover:text-accent hover:bg-accent/10 hover:border-accent/40 transition-all cursor-pointer" title="Modifier la voiture">
                        <FaEdit size={11} /> <span className="hidden sm:inline">Modifier</span>
                      </button>
                      <button onClick={() => setDeleteTarget(car)} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white/70 bg-white/5 border border-white/10 hover:text-red-400 hover:bg-red-500/10 hover:border-red-400/40 transition-all cursor-pointer" title="Supprimer la voiture">
                        <FaTrash size={11} /> <span className="hidden sm:inline">Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
