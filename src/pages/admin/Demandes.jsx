import { useState } from 'react';
import { FaEnvelopeOpenText, FaPhone, FaMapMarkerAlt, FaCar, FaTachometerAlt, FaCalendarAlt, FaGasPump, FaCogs, FaClipboardCheck, FaTrash, FaExpand, FaCheckCircle } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

const STATUS_META = {
  nouvelle: { label: 'Nouvelle', cls: 'bg-yellow-500/15 text-yellow-400' },
  'en cours': { label: 'En cours', cls: 'bg-sky-500/15 text-sky-400' },
  contactee: { label: 'Contactée', cls: 'bg-violet-500/15 text-violet-400' },
  terminee: { label: 'Terminée', cls: 'bg-green-500/15 text-green-400' },
};

const STATUS_OPTIONS = [
  { value: 'nouvelle', label: 'Nouvelle' },
  { value: 'en cours', label: 'En cours' },
  { value: 'contactee', label: 'Contactée' },
  { value: 'terminee', label: 'Terminée' },
];

const countBy = (requests, status) => requests.filter(r => r.status === status).length;

export default function AdminDemandes() {
  const { requests, updateRequestStatus, deleteRequest } = useAdmin();
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = (filter === 'all' ? requests : requests.filter(r => r.status === filter))
    .slice()
    .sort((a, b) => (b.id || 0) - (a.id || 0));

  const tabs = [
    { value: 'all', label: `Toutes (${requests.length})` },
    ...STATUS_OPTIONS.map(s => ({ value: s.value, label: `${s.label} (${countBy(requests, s.value)})` })),
  ];

  return (
    <AdminLayout>
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Échange & vente
        </p>
        <h1 className="title text-3xl text-white sm:text-4xl">Demandes reçues</h1>
        <p className="mt-2 text-white/50">
          Les formulaires soumis par les clients sur la page « Échange & vente »,
          avec leurs photos et toutes les informations du véhicule.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <FaEnvelopeOpenText className="mx-auto mb-4 text-white/30" size={32} />
          <p className="text-white/60">Aucune demande pour le moment.</p>
          <p className="mt-1 text-sm text-white/40">
            Les formulaires envoyés depuis la page Échange & vente apparaîtront ici.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                  filter === tab.value
                    ? 'bg-accent text-black font-semibold'
                    : 'bg-white/[0.02] border border-white/10 text-white/60 hover:border-accent/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-white/50">Aucune demande dans cette catégorie.</p>
          ) : (
            <div className="space-y-4">
              {filtered.map(req => (
                <DemandeCard
                  key={req.id}
                  req={req}
                  onStatus={updateRequestStatus}
                  onDelete={deleteRequest}
                  onOpenPhoto={setLightbox}
                />
              ))}
            </div>
          )}
        </>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="Photo du véhicule" className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <button
              onClick={() => setLightbox(null)}
              className="mt-4 mx-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-black text-sm font-semibold hover:bg-white transition-all cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function DemandeCard({ req, onStatus, onDelete, onOpenPhoto }) {
  const meta = STATUS_META[req.status] || STATUS_META.nouvelle;
  const infoItems = [
    req.annee && { icon: FaCalendarAlt, label: 'Année', value: req.annee },
    req.kilometrage && { icon: FaTachometerAlt, label: 'Kilométrage', value: `${req.kilometrage} km` },
    req.carburant && { icon: FaGasPump, label: 'Carburant', value: req.carburant },
    req.boite && { icon: FaCogs, label: 'Boîte', value: req.boite },
    req.etat && { icon: FaClipboardCheck, label: 'État', value: req.etat },
  ].filter(Boolean);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm flex-shrink-0">
            {(req.nom || '?').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-dark-text flex items-center gap-2 flex-wrap">
              {req.nom || 'Client sans nom'}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${meta.cls}`}>{meta.label}</span>
            </p>
            <p className="text-xs text-white/50 mt-0.5">{req.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={req.status}
            onChange={e => onStatus(req.id, e.target.value)}
            className="rounded-xl bg-dark-bg border border-white/10 px-3 py-2 text-sm text-white/80 outline-none [&>option]:bg-zinc-900 cursor-pointer"
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button
            onClick={() => onDelete(req.id)}
            className="w-10 h-10 rounded-xl bg-dark-bg border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-400/40 transition-all cursor-pointer"
            title="Supprimer la demande"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      {/* Vehicle + operation */}
      {(req.marque || req.modele) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white">
            <FaCar size={12} className="text-accent" />
            {req.marque} {req.modele}
          </span>
          {infoItems.map(item => (
            <span key={item.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
              <item.icon size={11} className="text-accent" />
              {item.label} : <span className="text-white/80 font-medium">{item.value}</span>
            </span>
          ))}
        </div>
      )}

      {/* Client info */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
        {req.operation && (
          <p className="text-white/70">
            <span className="text-white/40">Opération :</span> {req.operation}
          </p>
        )}
        {req.email && (
          <a href={`mailto:${req.email}`} className="text-white/70 hover:text-accent transition-colors truncate">
            <FaEnvelopeOpenText className="inline mr-1.5 text-accent" size={12} />
            {req.email}
          </a>
        )}
        {req.telephone && (
          <a href={`tel:${req.telephone.replace(/\s/g, '')}`} className="text-white/70 hover:text-accent transition-colors">
            <FaPhone className="inline mr-1.5 text-accent" size={12} />
            {req.telephone}
          </a>
        )}
        {req.ville && (
          <p className="text-white/70">
            <FaMapMarkerAlt className="inline mr-1.5 text-accent" size={12} />
            {req.ville}
          </p>
        )}
      </div>

      {/* Message */}
      {req.message && (
        <p className="mt-4 text-sm text-white/60 leading-relaxed border-t border-white/10 pt-4">
          {req.message}
        </p>
      )}

      {/* Photos */}
      {req.photos && req.photos.length > 0 && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="mb-3 text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
            <FaExpand size={11} /> Photos du véhicule ({req.photos.length})
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {req.photos.map((src, i) => (
              <button
                key={i}
                onClick={() => onOpenPhoto(src)}
                className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 cursor-pointer"
                title="Agrandir"
              >
                <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaExpand size={14} className="text-white" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mark done shortcut */}
      {req.status !== 'terminee' && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onStatus(req.id, 'terminee')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white/50 bg-white/5 border border-white/10 hover:text-green-400 hover:bg-green-500/10 hover:border-green-400/40 transition-all cursor-pointer"
          >
            <FaCheckCircle size={12} /> Marquer comme terminée
          </button>
        </div>
      )}
    </article>
  );
}
