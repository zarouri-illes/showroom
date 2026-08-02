import { useState } from 'react';
import { FaEnvelopeOpenText, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCar, FaExchangeAlt, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

const SERVICE_META = {
  location: { label: 'Location', icon: FaCar, cls: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
  echange: { label: 'Échange & Vente', icon: FaExchangeAlt, cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' },
};

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

const countBy = (requests, key, value) => requests.filter(r => r[key] === value).length;

export default function AdminDemandes() {
  const { requests, updateRequestStatus, deleteRequest } = useAdmin();
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = requests
    .filter(r => (serviceFilter === 'all' ? true : r.service === serviceFilter))
    .filter(r => (statusFilter === 'all' ? true : r.status === statusFilter))
    .slice()
    .sort((a, b) => (b.id || 0) - (a.id || 0));

  const serviceTabs = [
    { value: 'all', label: `Tous les services (${requests.length})` },
    { value: 'location', label: `Location (${countBy(requests, 'service', 'location')})` },
    { value: 'echange', label: `Échange & Vente (${countBy(requests, 'service', 'echange')})` },
  ];

  const statusTabs = [
    { value: 'all', label: 'Tous les statuts' },
    ...STATUS_OPTIONS.map(s => ({ value: s.value, label: s.label })),
  ];

  return (
    <AdminLayout>
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Services
        </p>
        <h1 className="title text-3xl text-white sm:text-4xl">Demandes reçues</h1>
        <p className="mt-2 text-white/50">
          Les demandes de location de voiture et d'échange &amp; vente envoyées depuis
          les pages « Services » et « Échange / Vente », avec toutes leurs informations.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <FaEnvelopeOpenText className="mx-auto mb-4 text-white/30" size={32} />
          <p className="text-white/60">Aucune demande pour le moment.</p>
          <p className="mt-1 text-sm text-white/40">
            Les formulaires envoyés depuis la page Services apparaîtront ici.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-8">
            {serviceTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setServiceFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                  serviceFilter === tab.value
                    ? 'bg-accent text-black font-semibold'
                    : 'bg-white/[0.02] border border-white/10 text-white/60 hover:border-accent/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {statusTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  statusFilter === tab.value
                    ? 'bg-white/10 text-white'
                    : 'bg-transparent text-white/40 hover:text-white/70'
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
                />
              ))}
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}

function DemandeCard({ req, onStatus, onDelete }) {
  const meta = STATUS_META[req.status] || STATUS_META.nouvelle;
  const serviceMeta = SERVICE_META[req.service] || { label: req.service || 'Service', icon: FaCar, cls: 'bg-white/5 text-white/60 border-white/10' };
  const ServiceIcon = serviceMeta.icon;

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
            <p className="text-xs text-white/50 mt-0.5 flex items-center gap-1.5">
              <FaCalendarAlt size={10} /> {req.date}
            </p>
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

      {/* Service + duration */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${serviceMeta.cls}`}>
          <ServiceIcon size={12} />
          {serviceMeta.label}
        </span>
        {req.duree && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
            <FaClock size={11} className="text-accent" />
            Durée : <span className="text-white/80 font-medium">{req.duree}</span>
          </span>
        )}
      </div>

      {/* Client info */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
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

      {/* Véhicule proposé (échange / vente) */}
      {req.brand && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Véhicule proposé</p>
          <p className="mt-2 text-sm font-bold text-white">{req.brand} {req.model || ''}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
            {req.year && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">Année : {req.year}</span>}
            {req.mileage && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{Number(req.mileage).toLocaleString('fr-FR')} km</span>}
            {req.fuel && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{req.fuel}</span>}
            {req.transmission && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{req.transmission}</span>}
            {req.engine && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{req.engine}</span>}
            {req.color && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{req.color}</span>}
            {req.prixSouhaite && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">Prix souhaité : {Number(req.prixSouhaite).toLocaleString('fr-FR')} DA</span>}
            {req.demandeType && <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{req.demandeType === 'echange' ? 'Échange' : 'Vente'}</span>}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        {req.status !== 'terminee' && (
          <button
            onClick={() => onStatus(req.id, 'terminee')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white/50 bg-white/5 border border-white/10 hover:text-green-400 hover:bg-green-500/10 hover:border-green-400/40 transition-all cursor-pointer"
          >
            <FaCheckCircle size={12} /> Marquer comme terminée
          </button>
        )}
      </div>
    </article>
  );
}
