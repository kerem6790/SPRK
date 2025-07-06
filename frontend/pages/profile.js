import { useState, useEffect } from 'react';

const SOCIALS = [
  { icon: 'X', url: '#' },
  { icon: 'IG', url: '#' },
  { icon: 'YT', url: '#' },
  { icon: 'TT', url: '#' },
];

export default function Profile({ userRole }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const inf = localStorage.getItem('selectedInfluencer');
      if (inf) setSelectedInfluencer(JSON.parse(inf));
    }
    checkWalletConnection();
  }, []);

  // Bu component'te wallet bağlantısını kontrol etmek için
  // Gerçek uygulamada bu bilgi global state'den gelecek
  const checkWalletConnection = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  };

  if (userRole === 'influencer' || selectedInfluencer) {
    const name = selectedInfluencer ? selectedInfluencer.name : 'Kerem Gegek';
    const score = selectedInfluencer ? selectedInfluencer.score : 80;
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
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#ccc', marginBottom: 16, border: '2px solid #aaa' }} />
          <div style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: 8 }}>{name}</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {SOCIALS.map(s => (
              <span key={s.icon} style={{ fontSize: 22, background: '#fff', border: '1.5px solid #222', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</span>
            ))}
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
            }}>{score}</span>
          </div>
          <button style={{
            background: 'white',
            border: '1.5px solid #222',
            borderRadius: '20px',
            padding: '8px 24px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginBottom: 12,
            marginTop: 8,
          }}>My Supporters</button>
          <button style={{
            background: '#ff512f',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 24px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
          }}>Create new NFT Collection</button>
        </div>
      </div>
    );
  }

  // Supporter için basit profil
  return (
    <div className="content-section">
      <h2 className="section-title">
        Profile
        <span className="role-indicator">
          (Supporter)
        </span>
      </h2>
      <div className="profile-info">
        <div className="info-card">
          <h3>Wallet Address</h3>
          <p className="wallet-address">
            {walletAddress || 'Not connected'}
          </p>
        </div>
      </div>
    </div>
  );
} 