import MintButton from '../components/MintButton';

export default function Create() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{
        background: 'white',
        border: '1.5px solid #222',
        borderRadius: '40px',
        padding: '40px 32px',
        minWidth: '400px',
        minHeight: '200px',
        boxShadow: '0 8px 32px rgba(255, 81, 47, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ fontWeight: 500, fontSize: '1.2rem', marginBottom: 24, textAlign: 'center' }}>
          Create your new NFT collection and start engaging with your supporters!
        </div>
        <button
          className="mint-btn"
          style={{
            fontSize: '1.3rem',
            padding: '20px 48px',
            borderRadius: '20px',
            background: '#ff512f',
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: 8,
            boxShadow: '0 2px 8px rgba(255, 81, 47, 0.10)',
            transition: 'background 0.2s',
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
} 