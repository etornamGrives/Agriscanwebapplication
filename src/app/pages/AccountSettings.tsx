import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Save, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

export function AccountSettings() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name,
        email: user.email
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock save - update localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user?.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...formData };
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-white">
      {/* Header */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl">Account Settings</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Manage your account information and preferences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Settings Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Profile Section */}
            <div className="bg-white rounded-2xl p-8 border border-border mb-6">
              <div className="flex items-center gap-6 mb-8">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-2xl mb-1">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary"
                >
                  Settings saved successfully!
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </form>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-border text-center">
                <p className="text-4xl text-primary mb-2">0</p>
                <p className="text-muted-foreground">Total Scans</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border text-center">
                <p className="text-4xl text-primary mb-2">0</p>
                <p className="text-muted-foreground">Blog Posts</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border text-center">
                <p className="text-4xl text-primary mb-2">0</p>
                <p className="text-muted-foreground">Total Upvotes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
