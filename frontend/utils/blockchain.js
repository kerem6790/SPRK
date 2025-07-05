import { ethers } from 'ethers';

// Contract ABI - SparkNFT.json'dan gelecek
const SparkNFTABI = [
  "function mint(address to, uint256 quantity) external payable",
  "function mintPrice() external view returns (uint256)",
  "function maxSupply() external view returns (uint256)",
  "function totalSupply() external view returns (uint256)"
];

// Contract adresi - hardcoded
const CONTRACT_ADDRESS = "0x2fcac62065dedC7765Fa06c68f4E883EB118B31c";

/**
 * NFT mint fonksiyonu
 * @param {number} quantity - Mint edilecek NFT sayısı
 * @param {ethers.Signer} signer - Ethers signer objesi
 * @returns {Promise<string>} Transaction hash
 */
export const mintNFT = async (quantity, signer) => {
  try {
    // Contract instance oluştur
    const contract = new ethers.Contract(CONTRACT_ADDRESS, SparkNFTABI, signer);
    
    // Mint fiyatını contract'tan çek
    const mintPrice = await contract.mintPrice();
    
    // Toplam fiyatı hesapla
    const totalPrice = mintPrice * BigInt(quantity);
    
    // Mint işlemini gönder
    const tx = await contract.mint(await signer.getAddress(), quantity, {
      value: totalPrice
    });
    
    // Transaction'ı bekle
    const receipt = await tx.wait();
    
    console.log('Mint transaction successful:', receipt.transactionHash);
    return receipt.transactionHash;
    
  } catch (error) {
    console.error('Mint error:', error);
    throw error;
  }
};

/**
 * Contract'ın mint fiyatını getir
 * @param {ethers.Signer} signer - Ethers signer objesi
 * @returns {Promise<string>} Mint fiyatı (ETH cinsinden)
 */
export const getMintPrice = async (signer) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, SparkNFTABI, signer);
    const mintPrice = await contract.mintPrice();
    return ethers.formatEther(mintPrice);
  } catch (error) {
    console.error('Get mint price error:', error);
    throw error;
  }
};

/**
 * Contract'ın max supply'ını getir
 * @param {ethers.Signer} signer - Ethers signer objesi
 * @returns {Promise<number>} Max supply
 */
export const getMaxSupply = async (signer) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, SparkNFTABI, signer);
    const maxSupply = await contract.maxSupply();
    return Number(maxSupply);
  } catch (error) {
    console.error('Get max supply error:', error);
    throw error;
  }
};

/**
 * Contract'ın total supply'ını getir
 * @param {ethers.Signer} signer - Ethers signer objesi
 * @returns {Promise<number>} Total supply
 */
export const getTotalSupply = async (signer) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, SparkNFTABI, signer);
    const totalSupply = await contract.totalSupply();
    return Number(totalSupply);
  } catch (error) {
    console.error('Get total supply error:', error);
    throw error;
  }
}; 