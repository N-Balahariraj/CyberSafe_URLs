import React, { useState } from 'react';
import { Globe2, Users, Bot, Home, Shield, ShieldAlert, CheckCircle, XCircle, UserCircle, LogOut, Settings } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Components
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-purple-400/20 to-pink-600/20 text-white shadow-lg'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-purple-400"
        />
        <span className="text-white/70 hidden md:block">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <p className="text-white font-semibold">{user.name}</p>
            <p className="text-white/60 text-sm">{user.email}</p>
          </div>
          
          <div className="p-2">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={18} />
              View Profile
            </Link>
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/10 rounded-lg transition-all duration-300"
              onClick={() => {
                // Handle logout
                setIsOpen(false);
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    bio: 'Web security enthusiast and developer',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/5">
          <div className="flex items-start justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Profile Settings</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 h-32"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-purple-400"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                  <p className="text-white/60">{user.email}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white/70 mb-2">Bio</h4>
                  <p className="text-white">{user.bio}</p>
                </div>
                <div>
                  <h4 className="text-white/70 mb-2">Location</h4>
                  <p className="text-white">{user.location}</p>
                </div>
                <div>
                  <h4 className="text-white/70 mb-2">Website</h4>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{
    safe: boolean;
    score: number;
    threats: string[];
    recommendations: string[];
  } | null>(null);

  const handleAnalyze = () => {
    // Simulated analysis result - in production, this would come from your backend
    setAnalysisResult({
      safe: true,
      score: 92,
      threats: [],
      recommendations: [
        'Enable HTTPS for all connections',
        'Update security headers',
        'Implement CSP policy'
      ]
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 md:py-0">
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right bottom, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1)),
            url("https://images.unsplash.com/photo-1557683316-973673baf926?w=1600")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#1a1a2e] to-[#2a1a4a]" />
      
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          WebAI Hub
        </span>
        <span className="block text-lg md:text-xl mt-4 text-white/60 font-normal">
          Advanced Website Analysis & Security Platform
        </span>
      </h1>

      <div className="w-full max-w-3xl px-4 space-y-8">
        <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-purple-400" size={28} />
            <h2 className="text-2xl font-semibold text-white">Website Analysis</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-lg"
            />
            <button 
              onClick={handleAnalyze}
              className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              Analyze Now
            </button>
          </div>
        </div>

        {analysisResult && (
          <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <CheckCircle className="text-purple-400" size={28} />
                Analysis Results
              </h2>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-600/20">
                {analysisResult.safe ? (
                  <>
                    <Shield className="text-green-400" size={24} />
                    <span className="text-green-400 font-semibold">Secure Website</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="text-red-400" size={24} />
                    <span className="text-red-400 font-semibold">Security Risks Detected</span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-lg">Security Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    {analysisResult.score}
                  </span>
                  <span className="text-white/60">/100</span>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-600 shadow-lg transition-all duration-500"
                  style={{ width: `${analysisResult.score}%` }}
                />
              </div>
            </div>

            {analysisResult.threats.length > 0 && (
              <div className="mb-6 p-6 rounded-xl bg-red-500/10 border border-red-500/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="text-red-400" size={24} />
                  Security Threats
                </h3>
                <div className="space-y-3">
                  {analysisResult.threats.map((threat, index) => (
                    <div key={index} className="flex items-center gap-3 text-red-400">
                      <XCircle size={18} />
                      <span>{threat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-purple-400" size={24} />
                Recommendations
              </h3>
              <div className="space-y-3">
                {analysisResult.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/80">
                    <CheckCircle size={18} className="text-purple-400" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const sampleReviews = [
    {
      url: 'https://example.com',
      title: 'Example Business Site',
      rating: 4.5,
      reviewCount: 128,
      lastAnalyzed: '2024-03-15',
      categories: ['Performance', 'SEO', 'Security'],
      summary: 'Strong performance metrics with excellent SEO practices. Minor security improvements recommended.'
    },
    {
      url: 'https://demo-store.com',
      title: 'Online Store Demo',
      rating: 3.8,
      reviewCount: 85,
      lastAnalyzed: '2024-03-14',
      categories: ['E-commerce', 'UX', 'Performance'],
      summary: 'Good user experience but needs optimization for better loading times. Mobile responsiveness could be improved.'
    },
    {
      url: 'https://tech-blog.net',
      title: 'Tech Blog Platform',
      rating: 4.8,
      reviewCount: 256,
      lastAnalyzed: '2024-03-13',
      categories: ['Content', 'Accessibility', 'SEO'],
      summary: 'Excellent content structure and accessibility features. Top-tier SEO implementation.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Recent Website Reviews
        </span>
      </h2>
      <div className="grid gap-8 max-w-5xl mx-auto">
        {sampleReviews.map((review, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/5 hover:bg-white/15 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">{review.title}</h3>
                <a href={review.url} className="text-purple-400 hover:text-purple-300 text-sm break-all" target="_blank" rel="noopener noreferrer">
                  {review.url}
                </a>
              </div>
              <div className="md:text-right bg-white/5 px-6 py-3 rounded-xl border border-white/5">
                <div className="text-yellow-400 text-2xl font-bold">{review.rating}/5.0</div>
                <div className="text-white/60">{review.reviewCount} reviews</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {review.categories.map((category, i) => (
                <span key={i} className="px-4 py-1.5 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full text-white/90 text-sm border border-white/5">
                  {category}
                </span>
              ))}
            </div>
            <p className="text-white/80 text-lg mb-4 leading-relaxed">{review.summary}</p>
            <div className="text-white/50 text-sm flex items-center gap-2">
              <CheckCircle size={16} className="text-purple-400" />
              Last analyzed: {review.lastAnalyzed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIAssistantPage = () => (
  <div className="container mx-auto px-4 py-12 md:py-16 min-h-[80vh] flex flex-col">
    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
      <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        AI Assistant
      </span>
    </h2>
    <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-white/5 max-w-5xl mx-auto">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          <div className="bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-2xl p-6 max-w-[80%] border border-white/5">
            <p className="text-white/90 text-lg">How can I assist you with website analysis today?</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
          <input
            type="text"
            placeholder="Ask about website security, performance, or SEO..."
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-lg"
          />
          <button className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 whitespace-nowrap">
            Send Message
          </button>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#2a1a4a]">
        <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-6 overflow-x-auto">
                <NavLink to="/">
                  <Home size={20} /> Home
                </NavLink>
                <NavLink to="/community">
                  <Users size={20} /> Community
                </NavLink>
                <NavLink to="/ai-assistant">
                  <Bot size={20} /> AI Assistant
                </NavLink>
              </div>
              <ProfileDropdown />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;