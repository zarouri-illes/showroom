import { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from './AdminLayout';
import ImageWithSkeleton from '../../components/ImageWithSkeleton';

const categories = ['Nouveautés', 'Conseils', 'Entretien', 'Concession'];

export default function AdminActualites() {
  const { articles, addArticle, deleteArticle } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Nouveautés', image: '', author: 'Auto Showroom' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    addArticle({ ...form, date: new Date().toISOString().split('T')[0] });
    setForm({ title: '', excerpt: '', content: '', category: 'Nouveautés', image: '', author: 'Auto Showroom' });
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-dark-text">Actualites</h1>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-all cursor-pointer">
          <FaPlus size={12} /> <span className="hidden sm:inline">{showForm ? 'Annuler' : 'Ajouter'}</span><span className="sm:hidden">{showForm ? 'Annuler' : 'Ajout'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-dark-card rounded-2xl border border-dark-border p-5 sm:p-6 space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Titre</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Extrait</label>
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Contenu</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={5} required className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all resize-y" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Categorie</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Auteur</label>
              <input type="text" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Image (chemin)</label>
              <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images.jfif" className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all" />
            </div>
          </div>
          <button type="submit" className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all cursor-pointer">Publier l'article</button>
        </form>
      )}

      {articles.length === 0 ? (
        <p className="text-gray-500 text-sm">Aucun article pour le moment.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {[...articles].sort((a, b) => b.id - a.id).map(article => (
            <div key={article.id} className="bg-dark-card rounded-2xl border border-dark-border p-3 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="w-full sm:w-24 h-32 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithSkeleton src={article.image || '/images.jfif'} alt={article.title} className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <p className="font-semibold text-sm text-dark-text truncate max-w-full">{article.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{article.category}</span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{article.excerpt || article.content.slice(0, 120)}</p>
              </div>
              <button onClick={() => deleteArticle(article.id)} className="w-11 h-11 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all cursor-pointer flex-shrink-0 self-end sm:self-auto" title="Supprimer">
                <FaTrash size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}