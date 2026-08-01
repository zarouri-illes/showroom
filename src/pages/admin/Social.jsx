import { useState } from 'react';
import { FaSave, FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkedAlt } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

export default function AdminSocial() {
  const { content, updateContent } = useAdmin();
  const [form, setForm] = useState({
    social: { ...content.social },
    contact_email: content.contact_email || '',
    contact_phone: content.contact_phone || '',
    contact_address: content.contact_address || '',
  });
  const [saved, setSaved] = useState(false);

  const setSocial = (key, value) => setForm(prev => ({ ...prev, social: { ...prev.social, [key]: value } }));

  const handleSave = () => {
    updateContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const socialFields = [
    { key: 'instagram', label: 'Instagram', icon: FaInstagram, placeholder: 'https://instagram.com/...' },
    { key: 'facebook', label: 'Facebook', icon: FaFacebook, placeholder: 'https://facebook.com/...' },
    { key: 'tiktok', label: 'TikTok', icon: FaTiktok, placeholder: 'https://tiktok.com/@...' },
    { key: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp, placeholder: 'https://wa.me/...' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-xl sm:text-2xl font-extrabold text-dark-text mb-2">Réseaux sociaux & Contact</h1>
      <p className="text-sm text-gray-400 mb-6">Modifiez les liens et coordonnées affichés sur la page Contact.</p>

      {saved && (
        <div className="bg-success/10 border border-success/20 text-success text-sm rounded-xl px-4 py-3 mb-4">
          Informations enregistrées avec succès.
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-dark-card rounded-2xl border border-dark-border p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-dark-text">Réseaux sociaux</h2>
          {socialFields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                <f.icon className="text-accent" size={14} /> {f.label}
              </label>
              <input
                type="url"
                value={form.social[f.key] || ''}
                onChange={e => setSocial(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="bg-dark-card rounded-2xl border border-dark-border p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-dark-text">Coordonnées</h2>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
              <FaEnvelope className="text-accent" size={14} /> Email
            </label>
            <input
              type="email"
              value={form.contact_email}
              onChange={e => setForm(prev => ({ ...prev, contact_email: e.target.value }))}
              placeholder="contact@autoshowroom.dz"
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
              <FaPhone className="text-accent" size={14} /> Téléphone
            </label>
            <input
              type="text"
              value={form.contact_phone}
              onChange={e => setForm(prev => ({ ...prev, contact_phone: e.target.value }))}
              placeholder="+213 21 123 456"
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
              <FaMapMarkedAlt className="text-accent" size={14} /> Adresse
            </label>
            <input
              type="text"
              value={form.contact_address}
              onChange={e => setForm(prev => ({ ...prev, contact_address: e.target.value }))}
              placeholder="123 Rue Didouche Mourad, Alger"
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
            />
          </div>
        </div>

        <div className="pt-2">
          <button onClick={handleSave} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all cursor-pointer">
            <FaSave size={13} /> Enregistrer
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}