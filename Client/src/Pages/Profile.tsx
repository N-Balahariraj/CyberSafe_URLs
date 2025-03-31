import { useState } from "react";

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

export default ProfilePage;