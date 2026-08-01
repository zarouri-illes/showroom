import { useAdmin } from '../../context/AdminContext';
import { FaStar, FaEye, FaEyeSlash } from 'react-icons/fa';
import AdminLayout from './AdminLayout';

function Etoiles({ note }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <FaStar key={i} className={i <= note ? 'text-yellow-400' : 'text-gray-600'} />
      ))}
    </div>
  );
}

export default function AdminAvis() {
  const { avis, toggleAvisVisibility } = useAdmin();

  return (
    <AdminLayout>
      <h1 className="text-xl sm:text-2xl font-bold text-dark-text mb-6">Avis clients</h1>

      {avis.length === 0 ? (
        <p className="text-gray-500 text-sm">Aucun avis pour le moment.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {avis.map(a => (
            <div key={a.id} className="bg-dark-card rounded-2xl border border-dark-border p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm flex-shrink-0">
                {a.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <p className="font-semibold text-sm text-dark-text">{a.name}</p>
                  <span className="text-xs text-gray-500">{a.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.visible ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                    {a.visible ? 'Visible' : 'En attente'}
                  </span>
                </div>
                <Etoiles note={a.note} />
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{a.comment}</p>
              </div>
              <button
                onClick={() => toggleAvisVisibility(a.id)}
                className="w-11 h-11 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 transition-all cursor-pointer flex-shrink-0 self-end sm:self-auto"
                title={a.visible ? 'Masquer' : 'Afficher'}
              >
                {a.visible ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}