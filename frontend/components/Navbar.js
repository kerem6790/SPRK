import ConnectWallet from './ConnectWallet';

export default function Navbar({ activeTab, setActiveTab, userRole, setUserRole, onSignerChange }) {
  return (
    <>
      {/* Navbar */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <img src="/logo.svg" alt="sprk logo" className="logo-image" />
          </div>
          <div className="header-right">
            {/* Role Switch */}
            <div className="role-switch">
              <button 
                className={`role-btn ${userRole === 'supporter' ? 'active' : ''}`}
                onClick={() => setUserRole('supporter')}
              >
                I am a Supporter
              </button>
              <button 
                className={`role-btn ${userRole === 'influencer' ? 'active' : ''}`}
                onClick={() => setUserRole('influencer')}
              >
                I am an Influencer
              </button>
            </div>
            <ConnectWallet onSignerChange={onSignerChange} />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-nav">
        <div className="tab-container">
          <button 
            className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'support' ? 'active' : ''} ${userRole === 'influencer' ? 'disabled' : ''}`}
            onClick={() => userRole === 'supporter' && setActiveTab('support')}
            disabled={userRole === 'influencer'}
          >
            Support Your Influencer
          </button>
          {userRole === 'influencer' && (
            <button 
              className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              Create Your NFT Collection
            </button>
          )}
        </div>
      </nav>
    </>
  );
} 