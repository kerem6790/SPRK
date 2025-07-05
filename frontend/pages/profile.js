import { useState, useEffect } from 'react';

export default function Profile({ userRole }) {
  const [walletAddress, setWalletAddress] = useState('');

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

  // Component mount olduğunda wallet kontrolü
  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <div className="content-section">
      <h2 className="section-title">
        Profile
        <span className="role-indicator">
          {userRole === 'supporter' ? ' (Supporter)' : ' (Influencer)'}
        </span>
      </h2>
      <div className="profile-info">
        <div className="info-card">
          <h3>Wallet Address</h3>
          <p className="wallet-address">
            {walletAddress || 'Not connected'}
          </p>
        </div>
        {userRole === 'influencer' && (
          <>
            <div className="info-card">
              <h3>Fame Score</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
            <div className="info-card">
              <h3>Community Score</h3>
              <p className="coming-soon">Coming Soon</p>
            </div>
            <div className="info-card">
              <h3>Creator Stats</h3>
              <p className="coming-soon">Collections: Coming Soon</p>
              <p className="coming-soon">Total Sales: Coming Soon</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 