import MintButton from '../components/MintButton';

export default function Support({ signer }) {
  return (
    <div className="content-section">
      <h2 className="section-title">Support Your Influencer</h2>
      <p className="section-description">
        Support your favorite influencers by minting their exclusive NFTs.
      </p>
      <MintButton signer={signer} />
    </div>
  );
} 