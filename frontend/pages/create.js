import MintButton from '../components/MintButton';

export default function Create() {
  return (
    <button
      className="mint-btn"
      style={{
        fontSize: '1.5rem',
        padding: '32px 64px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      Create
    </button>
  );
} 