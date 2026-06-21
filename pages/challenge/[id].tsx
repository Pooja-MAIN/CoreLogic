import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false });

export default function ChallengePage() {
  const [challenge, setChallenge] = useState<any>(null);
  const [code, setCode] = useState('// write function run(input) { return ""; }');
  const [result, setResult] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => { if (!id) return; axios.get(`/api/challenges?id=${id}`).then(r => setChallenge(r.data)); }, [id]);

  const submit = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const r = await axios.post('/api/challenges/submit', { challengeId: id, code }, { headers: { Authorization: `Bearer ${token}` }});
    setResult(r.data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{challenge?.title || 'Challenge'}</h1>
      <p className="mt-2">{challenge?.description}</p>
      <div className="mt-4 h-80 border">
        <MonacoEditor language="javascript" value={code} onChange={setCode} options={{ automaticLayout: true }} />
      </div>
      <button className="mt-4 btn" onClick={submit}>Submit</button>
      {result && (
        <pre className="mt-4 bg-gray-900 text-white p-4">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
