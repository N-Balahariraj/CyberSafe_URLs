import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home';
import CommunityPage from './Pages/Community';
import AIAssistantPage from './Pages/AIAssistant';
import ProfilePage from './Pages/Profile';
import Navbar from './Pages/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#2a1a4a]">
        <Navbar/>
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