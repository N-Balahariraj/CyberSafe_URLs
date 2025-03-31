import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';

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

export default ProfileDropdown;