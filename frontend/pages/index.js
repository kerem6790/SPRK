import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Home from './home';
import Profile from './profile';
import Support from './support';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('supporter');
  const [signer, setSigner] = useState(null);

  const handleSignerChange = (newSigner) => {
    setSigner(newSigner);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home userRole={userRole} setUserRole={setUserRole} />;
      case 'profile':
        return <Profile userRole={userRole} />;
      case 'support':
        return userRole === 'supporter' ? <Support signer={signer} /> : <Home userRole={userRole} />;
      default:
        return <Home userRole={userRole} />;
    }
  };

  return (
    <div className="container">
      <Head>
        <title>sprk NFT</title>
        <meta name="description" content="sprk NFT Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={userRole} 
        setUserRole={setUserRole}
        onSignerChange={handleSignerChange}
      />

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
} 