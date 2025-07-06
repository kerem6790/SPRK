import { useContext } from 'react';

export default function Home({ userRole, setUserRole }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{
        background: 'linear-gradient(135deg, #ff512f 0%, #f09819 100%)',
        borderRadius: '32px',
        padding: '60px 40px',
        minWidth: '500px',
        minHeight: '300px',
        boxShadow: '0 8px 32px rgba(255, 81, 47, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#222', marginBottom: '40px', textAlign: 'center' }}>
          fuel the sprk.
        </h1>
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            style={{
              background: userRole === 'supporter' ? '#ff512f' : 'white',
              color: userRole === 'supporter' ? 'white' : '#ff512f',
              border: '2px solid #ff512f',
              borderRadius: '20px',
              padding: '8px 24px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginRight: '4px',
              transition: 'all 0.2s',
            }}
            onClick={() => setUserRole('supporter')}
          >
            I'm a Supporter
          </button>
          <button
            style={{
              background: userRole === 'influencer' ? '#ff512f' : 'white',
              color: userRole === 'influencer' ? 'white' : '#ff512f',
              border: '2px solid #ff512f',
              borderRadius: '20px',
              padding: '8px 24px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => setUserRole('influencer')}
          >
            I'm an Influencer
          </button>
        </div>
      </div>
    </div>
  );
} 