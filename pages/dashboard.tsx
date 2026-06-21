import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  useEffect(() => { load(); }, []);
  async function load() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;
    const r = await axios.get('/api/me/submissions', { headers: { Authorization: `Bearer ${token}` }}).catch(()=>null);
    setSubmissions(r?.data || []);
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <h2 className="font-semibold">Submissions</h2>
        <div className="mt-2 space-y-2">
          {submissions.map(s => (
            <div key={s.id} className="p-2 border rounded">{s.challengeId} - {s.result}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
