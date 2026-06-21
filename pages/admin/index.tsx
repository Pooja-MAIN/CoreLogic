import { useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const create = async () => {
    await axios.post('/api/articles', { title, content, tags: [] });
    alert('created');
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="mt-4">
        <input className="border p-2 w-full" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="border p-2 w-full mt-2" rows={6} placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
        <button className="mt-2 btn" onClick={create}>Create Article</button>
      </div>
    </div>
  );
}
