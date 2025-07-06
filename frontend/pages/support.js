import { useState } from 'react';
import { useRouter } from 'next/router';

const INFLUENCERS = [
  { name: 'Kerem Gegek', score: 80 },
  { name: 'Miray Salar', score: 55 },
  { name: 'Çağlar Avcı', score: 60 },
  { name: 'Mete İzol', score: 20 },
];

export default function Support({ signer }) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filtered = INFLUENCERS.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleProfileClick = (inf) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedInfluencer', JSON.stringify(inf));
    }
    router.push('/profile');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{
        background: 'white',
        border: '1.5px solid #222',
        borderRadius: '40px',
        padding: '40px 32px',
        minWidth: '500px',
        minHeight: '300px',
        boxShadow: '0 8px 32px rgba(255, 81, 47, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '2px solid #ff512f',
              borderRadius: '20px',
              padding: '8px 32px 8px 32px',
              fontSize: '1.2rem',
              outline: 'none',
              marginBottom: 16,
              width: 180,
              textAlign: 'center',
              background: 'white',
              color: '#222',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((inf, idx) => (
            <div
              key={inf.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f8f8f8',
                border: '1.5px solid #222',
                borderRadius: '20px',
                padding: '6px 18px 6px 8px',
                minWidth: 260,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                boxShadow: '0 2px 8px rgba(255, 81, 47, 0.05)',
              }}
              onClick={() => handleProfileClick(inf)}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#ccc', marginRight: 12,
                border: '1.5px solid #aaa',
              }} />
              <span style={{ fontWeight: 500, color: '#222', flex: 1 }}>{inf.name}</span>
              <span style={{
                background: '#ff512f',
                color: 'white',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                marginLeft: 8,
                border: '2px solid #fff',
                boxShadow: '0 2px 8px rgba(255, 81, 47, 0.10)',
              }}>{inf.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 