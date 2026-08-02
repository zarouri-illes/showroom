import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { credentials } = useAdmin();
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('admin_remember_email');
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    if (email.trim().toLowerCase() !== credentials.email || password !== credentials.password) {
      setError('Identifiants incorrects. Veuillez réessayer.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (remember) {
        localStorage.setItem('admin_remember_email', email.trim());
      } else {
        localStorage.removeItem('admin_remember_email');
      }
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark-bg flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0">
        <img
          src="/images.jfif"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover blur-md scale-110 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/90 via-dark-bg/70 to-dark-bg/95" />
        <div className="absolute inset-0 aurora-bg" />
      </div>

      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="w-16 h-16 rounded-2xl bg-dark-card border border-accent/40 flex items-center justify-center overflow-hidden mx-auto mb-4 shadow-[0_0_30px_rgba(225,29,46,0.35)]"
        >
          <span className="text-accent text-lg font-extrabold">fr_auto</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-extrabold text-dark-text">gts auto</h1>
          <p className="text-sm text-gray-400 mt-1">Connectez-vous à l'administration</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
          className="rounded-2xl border border-white/10 bg-dark-card/60 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-black/20"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-sm"
            >
              <FaExclamationTriangle className="mt-0.5 flex-shrink-0" size={14} />
              <span>{error}</span>
            </motion.div>
          )}

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email</label>
            <div className="relative field-glow rounded-xl border border-white/10 bg-dark-bg/60 transition-all">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@showroom.fr"
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-dark-text text-sm outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Mot de passe</label>
            <div className="relative field-glow rounded-xl border border-white/10 bg-dark-bg/60 transition-all">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-transparent text-dark-text text-sm outline-none placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark-text cursor-pointer"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="sr-only"
              />
              <span className={`w-4.5 h-4.5 flex-shrink-0 rounded-md border transition-all duration-200 flex items-center justify-center ${
                remember
                  ? 'bg-accent border-accent'
                  : 'border-white/25 group-hover:border-accent/60'
              }`}>
                {remember && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-gray-300">Se souvenir de moi</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent text-black text-sm font-bold hover:bg-white disabled:opacity-80 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,46,0.3)]"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" size={15} />
                <span>Connexion...</span>
              </>
            ) : (
              <span>Se connecter</span>
            )}
          </button>

        </motion.form>
      </div>
    </div>
  );
}
