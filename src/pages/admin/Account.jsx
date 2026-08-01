import { useState } from 'react';
import { FaSave, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaUserEdit } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';

const inputBase = 'w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all';

export default function AdminAccount() {
  const { credentials, updateCredentials } = useAdmin();
  const [email, setEmail] = useState(credentials.email || '');
  const [emailPassword, setEmailPassword] = useState('');
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailMsg, setEmailMsg] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);

  const Message = ({ msg }) => msg && (
    <div className={`text-sm rounded-xl px-4 py-3 border ${
      msg.type === 'success'
        ? 'bg-success/10 border-success/20 text-success'
        : 'bg-red-500/10 border-red-500/30 text-red-300'
    }`}>
      {msg.text}
    </div>
  );

  const PasswordToggle = ({ show, onClick, ariaLabel }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark-text cursor-pointer"
      aria-label={ariaLabel}
    >
      {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
    </button>
  );

  const handleSaveEmail = (e) => {
    e.preventDefault();
    setEmailMsg(null);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setEmailMsg({ type: 'error', text: 'Veuillez saisir un email.' });
      return;
    }
    if (trimmedEmail === credentials.email) {
      setEmailMsg({ type: 'error', text: 'Le nouvel email est identique à l\'email actuel.' });
      return;
    }
    if (emailPassword !== credentials.password) {
      setEmailMsg({ type: 'error', text: 'Le mot de passe actuel est incorrect.' });
      return;
    }

    setSavingEmail(true);
    setTimeout(() => {
      updateCredentials({ email: trimmedEmail });
      setEmailPassword('');
      setSavingEmail(false);
      setEmailMsg({ type: 'success', text: 'Email mis à jour avec succès.' });
      setTimeout(() => setEmailMsg(null), 3500);
    }, 1000);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (currentPassword !== credentials.password) {
      setPasswordMsg({ type: 'error', text: 'Le mot de passe actuel est incorrect.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 6 caractères.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      updateCredentials({ password: newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSavingPassword(false);
      setPasswordMsg({ type: 'success', text: 'Mot de passe mis à jour avec succès.' });
      setTimeout(() => setPasswordMsg(null), 3500);
    }, 1000);
  };

  const SaveButton = ({ saving, label, savingLabel }) => (
    <button
      type="submit"
      disabled={saving}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover disabled:opacity-70 transition-all cursor-pointer"
    >
      {saving ? (
        <>
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          {savingLabel}
        </>
      ) : (
        <>
          <FaSave size={13} /> {label}
        </>
      )}
    </button>
  );

  return (
    <AdminLayout>
      <h1 className="text-xl sm:text-2xl font-extrabold text-dark-text mb-2">Compte</h1>
      <p className="text-sm text-gray-400 mb-6">Modifiez indépendamment l'email ou le mot de passe de l'administration.</p>

      <div className="max-w-2xl space-y-6">
        <form onSubmit={handleSaveEmail} className="bg-dark-card rounded-2xl border border-dark-border p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-dark-text flex items-center gap-2">
            <FaUserEdit className="text-accent" size={16} /> Modifier l'email
          </h2>

          <Message msg={emailMsg} />

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
              <FaEnvelope className="text-accent" size={14} /> Nouvel email de l'administrateur
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@showroom.fr"
              autoComplete="email"
              className={inputBase}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
              <FaLock className="text-accent" size={14} /> Mot de passe actuel (pour confirmer)
            </label>
            <div className="relative">
              <input
                type={showEmailPassword ? 'text' : 'password'}
                value={emailPassword}
                onChange={e => setEmailPassword(e.target.value)}
                placeholder="Mot de passe actuel"
                autoComplete="current-password"
                className={inputBase + ' pr-10'}
              />
              <PasswordToggle
                show={showEmailPassword}
                onClick={() => setShowEmailPassword(s => !s)}
                ariaLabel="Afficher / masquer le mot de passe"
              />
            </div>
          </div>

          <div>
            <SaveButton saving={savingEmail} label="Mettre à jour l'email" savingLabel="Enregistrement..." />
          </div>
        </form>

        <form onSubmit={handleSavePassword} className="bg-dark-card rounded-2xl border border-dark-border p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-dark-text flex items-center gap-2">
            <FaShieldAlt className="text-accent" size={16} /> Modifier le mot de passe
          </h2>

          <Message msg={passwordMsg} />

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
              <FaLock className="text-accent" size={14} /> Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Mot de passe actuel"
                autoComplete="current-password"
                className={inputBase + ' pr-10'}
              />
              <PasswordToggle
                show={showCurrent}
                onClick={() => setShowCurrent(s => !s)}
                ariaLabel="Afficher / masquer le mot de passe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                <FaLock className="text-accent" size={14} /> Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  autoComplete="new-password"
                  className={inputBase + ' pr-10'}
                />
                <PasswordToggle
                  show={showNew}
                  onClick={() => setShowNew(s => !s)}
                  ariaLabel="Afficher / masquer le nouveau mot de passe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                <FaLock className="text-accent" size={14} /> Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirmer le mot de passe"
                  autoComplete="new-password"
                  className={inputBase + ' pr-10'}
                />
                <PasswordToggle
                  show={showConfirm}
                  onClick={() => setShowConfirm(s => !s)}
                  ariaLabel="Afficher / masquer la confirmation"
                />
              </div>
            </div>
          </div>

          <div>
            <SaveButton saving={savingPassword} label="Mettre à jour le mot de passe" savingLabel="Enregistrement..." />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
