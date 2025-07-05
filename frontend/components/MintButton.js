import { mintNFT } from '../utils/blockchain';

export default function MintButton({ signer }) {
  const handleMint = async () => {
    try {
      if (!signer) {
        console.error('Signer not available');
        return;
      }

      // Quantity'yi 1 olarak sabit bırak, sonra input'tan alabiliriz
      const quantity = 1;
      
      const txHash = await mintNFT(quantity, signer);
      console.log('Mint successful! Transaction hash:', txHash);
      
    } catch (error) {
      console.error('Mint failed:', error);
    }
  };

  return (
    <button className="mint-btn" onClick={handleMint}>
      Mint NFT
    </button>
  );
} 