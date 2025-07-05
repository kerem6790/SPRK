import { useState } from 'react';
import { ethers } from 'ethers';

export default function ConnectWallet({ onSignerChange }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        
        // Ethers provider ve signer oluştur
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        // Parent component'e signer'ı geçir
        if (onSignerChange) {
          onSignerChange(signer);
        }
      } else {
        alert('MetaMask yüklü değil!');
      }
    } catch (error) {
      console.error('Wallet bağlantı hatası:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    
    // Parent component'e null signer geçir
    if (onSignerChange) {
      onSignerChange(null);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...`;
  };

  return (
    <button 
      className={`wallet-btn ${isConnected ? 'connected' : ''}`}
      onClick={isConnected ? disconnectWallet : connectWallet}
    >
      {isConnected ? formatAddress(walletAddress) : 'Connect Wallet'}
    </button>
  );
} 