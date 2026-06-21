import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold">ChipVerse (MVP)</h1>
        <p className="mt-4">VLSI & HDL learning, interview prep, coding & HDL practice.</p>
        <div className="mt-6 space-x-4">
          <Link href="/articles"><a className="btn">Articles</a></Link>
          <Link href="/dashboard"><a className="btn">Dashboard</a></Link>
          <Link href="/admin"><a className="btn">Admin</a></Link>
        </div>
      </div>
    </div>
  );
}
