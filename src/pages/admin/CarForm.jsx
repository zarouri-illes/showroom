import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTimes, FaImage } from 'react-icons/fa';
import { brands } from '../../data/admin/cars';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

const fuelOptions = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const transmissionOptions = ['Automatique', 'Manuelle', 'DSG 7 vitesses', 'Automatique 8 vitesses', 'Automatique 9G-TRONIC'];
const statusOptions = ['disponible', 'vendue'];
const categoryOptions = [
  { value: 'new', label: 'Voiture neuve' },
  { value: 'used', label: "Voiture d'occasion" },
  { value: 'stock', label: 'En stock' },
];

const inputBase =
  'w-full px-4 py-3 rounded-xl bg-dark-bg border border-white/10 text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all placeholder:text-white/30';

const emptyForm = {
  brand: '',
  model: '',
  name: '',
  year: new Date().getFullYear(),
  category: 'new',
  status: 'disponible',
  mileage: '',
  price: '',
  oldPrice: '',
  fuel: 'Essence',
  transmission: 'Automatique',
  power: '',
  acceleration: '',
  topSpeed: '',
  seats: '',
  engine: '',
  color: '',
  location: '',
  badge: '',
  featured: false,
  description: '',
  images: [],
};

export default function AdminCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, addCar, updateCar } = useAdmin();
  const isEdit = !!id;
  const existing = isEdit ? cars.find(c => c.id === Number(id)) : null;

  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existing) {
      setForm({
        brand: existing.brand || '',
        model: existing.model || '',
        name: existing.name || '',
        year: existing.year || new Date().getFullYear(),
        category: existing.category || 'new',
        status: existing.status || 'disponible',
        mileage: existing.mileage ?? '',
        price: existing.price ?? '',
        oldPrice: existing.oldPrice ?? '',
        fuel: existing.fuel || 'Essence',
        transmission: existing.transmission || 'Automatique',
        power: existing.power || '',
        acceleration: existing.acceleration || '',
        topSpeed: existing.topSpeed || '',
        seats: existing.seats ?? '',
        engine: existing.engine || '',
        color: existing.color || '',
        location: existing.location || '',
        badge: existing.badge || '',
        featured: !!existing.featured,
        description: existing.description || '',
        images: existing.images?.length ? [...existing.images] : [],
      });
    }
  }, [existing]);

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const addFiles = (files) => {
    const list = Array.from(files || []);
    list.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = ev => {
        setForm(prev => ({ ...prev, images: [...prev.images, ev.target.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const removeImage = (i) =>
    setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }));

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.brand || !form.model) {
      setError('Merci de choisir la marque et le modèle.');
      return;
    }
    if (!form.price) {
      setError('Merci de renseigner le prix.');
      return;
    }
    if (form.mileage === '' || form.mileage === null) {
      setError('Merci de renseigner le kilométrage (0 pour une voiture neuve).');
      return;
    }

    const autoName = `${form.brand} ${form.model} ${form.year}`;
    const data = {
      ...form,
      name: form.name.trim() || autoName,
      year: Number(form.year),
      mileage: Number(form.mileage),
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      seats: form.seats ? Number(form.seats) : 5,
      images: form.images.filter(Boolean),
    };

    if (isEdit) {
      updateCar(Number(id), data);
      setSuccess('Voiture modifiée avec succès.');
    } else {
      addCar(data);
      setSuccess('Voiture ajoutée avec succès.');
      setForm(emptyForm);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredModels = brands.find(b => b.name === form.brand)?.models || [];

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <button onClick={() => navigate('/admin/cars')} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-4 transition-colors cursor-pointer">
          <FaArrowLeft size={11} /> Retour au stock
        </button>

        <h1 className="title text-2xl sm:text-3xl text-white mb-6">
          {isEdit ? 'Modifier la voiture' : 'Ajouter une voiture'}
        </h1>

        {success && <div className="bg-success/10 border border-success/20 text-success text-sm rounded-xl px-4 py-3 mb-4">{success}</div>}
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Identité du véhicule</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Marque *</label>
                <select value={form.brand} onChange={e => set('brand', e.target.value)} className={inputBase + ' appearance-none cursor-pointer'}>
                  <option value="">Sélectionner…</option>
                  {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Modèle *</label>
                <input list="models" value={form.model} onChange={e => set('model', e.target.value)} placeholder="Ex: A6" className={inputBase} />
                <datalist id="models">
                  {filteredModels.map(m => <option key={m} value={m} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Nom complet</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Auto-généré si vide" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Année *</label>
                <input type="number" value={form.year} onChange={e => set('year', e.target.value)} className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Catégorie</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} className={inputBase + ' appearance-none cursor-pointer'}>
                  {categoryOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Statut</label>
                <select value={form.status} onChange={e => set('status', e.target.value)} className={inputBase + ' appearance-none cursor-pointer'}>
                  {statusOptions.map(o => <option key={o} value={o}>{o === 'disponible' ? 'Disponible' : 'Vendue'}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Kilométrage *</label>
                <input type="number" value={form.mileage} onChange={e => set('mileage', e.target.value)} placeholder="Ex: 12500 (0 = neuf)" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Localisation</label>
                <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Ex: Herkat, Bouria, Algérie" className={inputBase} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Prix</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Prix * (DA)</label>
                <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="Ex: 5350000" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Ancien prix (DA)</label>
                <input type="number" value={form.oldPrice} onChange={e => set('oldPrice', e.target.value)} placeholder="Laissez vide si aucun" className={inputBase} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Caractéristiques</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Carburant</label>
                <select value={form.fuel} onChange={e => set('fuel', e.target.value)} className={inputBase + ' appearance-none cursor-pointer'}>
                  {fuelOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Transmission</label>
                <select value={form.transmission} onChange={e => set('transmission', e.target.value)} className={inputBase + ' appearance-none cursor-pointer'}>
                  {transmissionOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Puissance</label>
                <input type="text" value={form.power} onChange={e => set('power', e.target.value)} placeholder="Ex: 150 CH" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">0 à 100 km/h</label>
                <input type="text" value={form.acceleration} onChange={e => set('acceleration', e.target.value)} placeholder="Ex: 8,7 s" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Vitesse max</label>
                <input type="text" value={form.topSpeed} onChange={e => set('topSpeed', e.target.value)} placeholder="Ex: 212 km/h" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Places</label>
                <input type="number" value={form.seats} onChange={e => set('seats', e.target.value)} placeholder="Ex: 5" className={inputBase} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-white/50 mb-1">Moteur</label>
                <input type="text" value={form.engine} onChange={e => set('engine', e.target.value)} placeholder="Ex: 1.5 TSI" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Couleur</label>
                <input type="text" value={form.color} onChange={e => set('color', e.target.value)} placeholder="Ex: Gris Nardo" className={inputBase} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-1">Badge</label>
                <input type="text" value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Ex: Nouveau, Sport…" className={inputBase} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none sm:pt-6">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => set('featured', e.target.checked)}
                  className="sr-only"
                />
                <span className={`w-5 h-5 flex-shrink-0 rounded-md border transition-all duration-200 flex items-center justify-center ${
                  form.featured ? 'bg-accent border-accent' : 'border-white/25'
                }`}>
                  {form.featured && <svg className="w-3 h-3 text-black" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span className="text-sm text-white/70">Mettre en vedette</span>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Description</h2>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} className={inputBase + ' resize-y'} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Photos</h2>

            {form.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-dark-bg border border-white/10">
                    <img src={img} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1.5 right-1.5 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all cursor-pointer" title="Supprimer">
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center gap-2 w-full py-10 rounded-xl border-2 border-dashed border-white/15 bg-dark-bg hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
            >
              <FaImage className="text-white/40" size={22} />
              <span className="text-sm text-white/60 font-medium">Cliquez ou déposez des photos ici</span>
              <span className="text-xs text-white/30">La première photo sera utilisée en vignette</span>
              <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-white transition-all cursor-pointer">
              <FaSave size={13} /> {isEdit ? 'Enregistrer les modifications' : 'Ajouter la voiture'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
