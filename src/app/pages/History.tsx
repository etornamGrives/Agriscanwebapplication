import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, Calendar, Leaf, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { getScanHistory, ScanHistory as ScanHistoryType } from '../utils/mockData';
import { formatDistanceToNow } from 'date-fns';

export function History() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ScanHistoryType[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      const userHistory = getScanHistory(user.id);
      setHistory(userHistory);
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-white">
      {/* Header */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <HistoryIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl">Scan History</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              View all your previous plant scans and diagnoses
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <HistoryIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl mb-2">No Scan History</h3>
              <p className="text-muted-foreground mb-6">
                You haven't scanned any plants yet
              </p>
              <button
                onClick={() => navigate('/scan')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Leaf className="w-5 h-5" />
                Scan Your First Leaf
              </button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-lg transition-all group"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-secondary">
                    <img
                      src={item.image}
                      alt={item.plantName}
                      className="w-full h-full object-cover"
                    />
                    {item.postedAsBlog && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        Posted
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg mb-1">{item.plantName}</h3>
                        <p className="text-sm text-destructive">{item.diagnosis}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</span>
                    </div>

                    {/* Remedies Preview */}
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.remedies.length} remedies recommended
                      </p>
                      <div className="space-y-1">
                        {item.remedies.slice(0, 2).map((remedy, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground truncate">
                            • {remedy}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* View Button */}
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/70 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
