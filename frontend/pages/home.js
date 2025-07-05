export default function Home({ userRole }) {
  return (
    <div className="content-section">
      <h2 className="section-title">
        Welcome to sprk
        <span className="role-indicator">
          {userRole === 'supporter' ? ' (Supporter Mode)' : ' (Influencer Mode)'}
        </span>
      </h2>
      <p className="section-description">
        {userRole === 'supporter' 
          ? 'Discover and collect unique digital collectibles from your favorite influencers. Support creators and build your NFT collection.'
          : 'Create, launch, and monetize your digital collectibles. Connect with your community and build your brand through NFTs.'
        }
      </p>
      <div className="features-grid">
        {userRole === 'supporter' ? (
          <>
            <div className="feature-card">
              <h3>Discover</h3>
              <p>Explore unique NFT collections</p>
            </div>
            <div className="feature-card">
              <h3>Collect</h3>
              <p>Build your digital collection</p>
            </div>
            <div className="feature-card">
              <h3>Support</h3>
              <p>Back your favorite creators</p>
            </div>
          </>
        ) : (
          <>
            <div className="feature-card">
              <h3>Create</h3>
              <p>Mint your own unique NFTs</p>
            </div>
            <div className="feature-card">
              <h3>Launch</h3>
              <p>Release collections to your community</p>
            </div>
            <div className="feature-card">
              <h3>Monetize</h3>
              <p>Earn from your digital assets</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 