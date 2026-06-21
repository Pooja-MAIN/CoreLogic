import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ArticlesPage() {
  const [q, setQ] = useState('');
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => { load(); }, []);
  async function load() {
    const r = await axios.get('/api/articles');
    setArticles(r.data);
  }
  async function search(e:any) { e.preventDefault(); const r = await axios.get(`/api/articles?q=${encodeURIComponent(q)}`); setArticles(r.data); }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Articles</h1>
      <form onSubmit={search} className="mt-4">
        <input className="border p-2 mr-2" placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
        <button className="btn" type="submit">Search</button>
      </form>
      <div className="mt-6 space-y-4">
        {articles.map(a => (
          <div key={a.id} className="p-4 border rounded">
            <h2 className="font-semibold">{a.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{a.content.substring(0,200)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
